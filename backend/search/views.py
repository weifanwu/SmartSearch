import os
from .utils.searx_wrapper import SearxSearchWrapperCustom
from django.http import StreamingHttpResponse
from langchain.chains.combine_documents.stuff import create_stuff_documents_chain
from langchain_openai import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain.schema import Document

def get_secret(secret_name):
    try:
        with open(f'/run/secrets/{secret_name}', 'r') as secret_file:
            return secret_file.read().strip()
    except IOError:
        return None

def search_query(request):
    query = request.GET.get('query', '')
    if not query:
        return JsonResponse({"error": "Query parameter is required."}, status=400)
    searx_api_url = os.getenv('SEARXNG_API_URL') or "http://localhost:4000"
    # todo: make sure use local env to store openai_key
    # OPENAI_API_KEY = get_secret('openai_key')
    searx_wrapper = SearxSearchWrapperCustom(host=searx_api_url)
    snippets = searx_wrapper.search(query=query, engines=["brave"], num_results=5)
    # html_contents = searx_wrapper.fetch_webpages(urls)
    # extracted_contents = [searx_wrapper.extract_article_content(html) for html in html_contents]
    documents = [
        Document(
            page_content=str(snippet),
        )
        for snippet in snippets
    ]
    prompt_template = PromptTemplate(
        input_variables=["context", "question"],
        template="this is the latest information about the world {context}\n and use it and your own knolwdge imaging you are a AI search engine, answers this questiom: {question}"
    )

    llm = ChatOpenAI(
        model="gpt-4o",
        temperature=1,
        max_tokens=None,
        timeout=None,
        max_retries=2,
        stream=True,
        api_key="OPENAI_API_KEY",
    )
    
    qa_chain = create_stuff_documents_chain(llm=llm, prompt=prompt_template)

    def event_stream():
        yield "event: message\n\n"
        for chunk in qa_chain.stream({"context": documents, "question": query}):
            yield f"data: {str(chunk)}\n\n"

    response = StreamingHttpResponse(event_stream(), content_type='text/event-stream')
    response['Cache-Control'] = 'no-cache'

    return response
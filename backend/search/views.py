import os
from .utils.searx_wrapper import SearxSearchWrapperCustom
from django.http import JsonResponse
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
    searx_api_url = os.getenv('SEARXNG_API_URL')
    # todo: make sure use local env to store openai_key
    # OPENAI_API_KEY = get_secret('openai_key')
    searx_wrapper = SearxSearchWrapperCustom(host=searx_api_url)
    search_results = searx_wrapper.search(query=query, engines=["google", "brave"], num_results=5)
    prompt_template = PromptTemplate(
        input_variables=["context", "question"],
        template="Given the following context: {context}\n imaging you are a AI search engine, answers this questiom: {question}"
    )

    documents = [
        Document(
            page_content=result.get("snippet"),
            metadata={
                "url": result.get("link"),
                "title": result.get("title"),
                "engine": result.get("engines", [])[0] if result.get("engines") else None,
                "category": result.get("category"),
            }
        )
        for result in search_results
    ]

    llm = ChatOpenAI(
        model="gpt-4o",
        temperature=1,
        max_tokens=None,
        timeout=None,
        max_retries=2,
        api_key="YOUR_API_KEY",
    )

    qa_chain = create_stuff_documents_chain(llm=llm, prompt=prompt_template)

    answer = qa_chain.invoke({"context": documents, "question": query})
    
    return JsonResponse({"query": query, "answer": answer, "results": search_results})
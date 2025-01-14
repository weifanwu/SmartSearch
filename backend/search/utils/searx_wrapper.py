from langchain_community.tools.searx_search.tool import SearxSearchWrapper
import requests
from bs4 import BeautifulSoup

class SearxSearchWrapperCustom:
    def __init__(self, host):
        self.wrapper = SearxSearchWrapper(searx_host=host)

    def search(self, query, engines=None, num_results=7):
        # Return URLs from search results
        results = self.wrapper.results(query=query, engines=engines, num_results=num_results)
        snippets = [result['snippet'] for result in results if 'snippet' in result]
        print(snippets)
        return snippets

    def fetch_webpages(self, urls):
        # Accept a list of URLs and fetch their content
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
        }
        contents = []
        for url in urls:
            response = requests.get(url, headers=headers)
            if response.status_code == 200:
                contents.append(response.content)
            else:
                contents.append(response.status_code)
        return contents

    def extract_article_content(self, html):
        print(html)
        soup = BeautifulSoup(html, "html.parser")
        article = soup.find("article")  # 选择目标元素
        return article.get_text(strip=True) if article else "Content not found"

    def clean_and_chunk_content(self, text, chunk_size=500):
        # 清洗内容
        cleaned_text = text.replace('\n', ' ').replace('\r', '').strip()
        
        # 分块处理
        chunks = [cleaned_text[i:i+chunk_size] for i in range(0, len(cleaned_text), chunk_size)]
        return chunks
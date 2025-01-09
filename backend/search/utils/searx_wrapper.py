from langchain_community.tools.searx_search.tool import SearxSearchWrapper

class SearxSearchWrapperCustom:
    def __init__(self, host):
        self.wrapper = SearxSearchWrapper(searx_host=host)

    def search(self, query, engines=None, num_results=5):
        return self.wrapper.results(query=query, engines=engines, num_results=num_results)
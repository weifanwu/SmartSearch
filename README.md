# SmartSearch

SmartSearch is an advanced search application inspired by PerplexityAI. It combines Retrieval-Augmented Generation (RAG) techniques with cutting-edge technologies to deliver precise and context-aware search results.

## Features
- **RAG-based Search**: Integrates Elasticsearch and SearxNG for document retrieval, paired with OpenAI's API for generating accurate, human-like responses.
- **Dynamic User Interface**: Built with React to ensure an intuitive and interactive experience.
- **Flexible Backend Architecture**: Powered by Django, seamlessly coordinating data flow between frontend, retrieval systems, and language models.
- **Customizable Search Pipelines**: Enhanced by LangChain, enabling easy configuration of RAG workflows to suit diverse use cases.

---

## Frontend
- **Tech Stack**: Developed using React with modern hooks and component-based design.
- **Real-time Updates**: Enables dynamic interaction and instant updates for user queries.
- **Interactive Design**: Provides a smooth user experience with an emphasis on accessibility and responsiveness.

---

## Backend
- **Core Framework**: Built with Django for robust and scalable server-side architecture.
- **Integrated RAG Pipelines**: Utilizes LangChain to connect Elasticsearch and SearxNG with OpenAI's API, forming an optimized retrieval and generation workflow.
- **API Management**: Implements RESTful APIs to process search queries and return structured, contextually relevant results.

---

## Technologies Used
- **LangChain**: Streamlines the RAG process with modular and flexible pipelines.
- **React**: Powers the frontend with efficient state management and rendering.
- **Django**: Manages backend operations with a focus on scalability and security.
- **Elasticsearch**: Provides a powerful search and analytics engine for document retrieval.
- **SearxNG**: Offers meta-search capabilities, aggregating results from various sources.
- **OpenAI API**: Delivers state-of-the-art natural language generation for accurate and insightful responses.

---

## Getting Started

### Prerequisites
- **Frontend**: Node.js and npm installed.
- **Backend**: Python (3.8 or higher), Django, and Elasticsearch installed.
- **Environment Variables**: API keys for OpenAI and SearxNG configured.

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd smartsearch
   ```
3. Set up the frontend:
   ```bash
   cd frontend
   npm install
   ```
4. Configure the backend:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

5. Configure Elasticsearch and SearxNG:
   - Start Elasticsearch and ensure it is running.
   - Set up SearxNG for meta-search integration.

---

## Usage

1. **Run Elasticsearch and SearxNG**:
   - Start Elasticsearch locally or use a managed instance.
   - Launch SearxNG and configure its API endpoint in the backend.

2. **Start the Backend**:
   ```bash
   python manage.py runserver
   ```

3. **Start the Frontend**:
   ```bash
   cd frontend
   npm start
   ```

4. **Access the Application**:
   Open your browser and navigate to `http://localhost:3000` to start using SmartSearch.

---

## Contributing
Contributions are highly encouraged! To contribute:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request with a clear description of your changes.

---

## License
This project is licensed under the **MIT License**. See the `LICENSE` file for details.
package com.nathanormond.controller;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;

public abstract class AbstractHttpServlet extends HttpServlet {
	
	private static final long serialVersionUID = 908349235659352385L;

	public RequestDispatcher createRequestDispatcher(HttpServletRequest request, String pageURL) { 
		return request.getRequestDispatcher(pageURL);
	}
	
	public RequestDispatcher createPOSTRequestDispatcher(HttpServletRequest request) { 
		return createRequestDispatcher(request, getPOSTPageURL());
	}
	
	public RequestDispatcher createGETRequestDispatcher(HttpServletRequest request) { 
		return createRequestDispatcher(request, getGETPageURL());
	}

	public RequestDispatcher createPUTRequestDispatcher(HttpServletRequest request) { 
		return createRequestDispatcher(request, getPUTPageURL());
	}

	public RequestDispatcher createDELETERequestDispatcher(HttpServletRequest request) { 
		return createRequestDispatcher(request, getDELETEPageURL());
	}

	protected abstract String getPOSTPageURL();
	protected abstract String getGETPageURL();
	protected abstract String getPUTPageURL();
	protected abstract String getDELETEPageURL();

}
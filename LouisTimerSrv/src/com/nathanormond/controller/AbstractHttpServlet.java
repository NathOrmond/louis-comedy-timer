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
	
	protected abstract String getPOSTPageURL();

	public RequestDispatcher createGETRequestDispatcher(HttpServletRequest request) { 
		return createRequestDispatcher(request, getGETPageURL());
	}
	
	protected abstract String getGETPageURL();

	public RequestDispatcher createPUTRequestDispatcher(HttpServletRequest request) { 
		return createRequestDispatcher(request, getPUTPageURL());
	}
	
	protected abstract String getPUTPageURL();

	public RequestDispatcher createDELETERequestDispatcher(HttpServletRequest request) { 
		return createRequestDispatcher(request, getDELETEPageURL());
	}

	protected abstract String getDELETEPageURL();

}
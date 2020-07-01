package com.nathanormond.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class LouisTimerServlet
 */
@WebServlet("/timer")
public class LouisTimerServlet extends AbstractHttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public LouisTimerServlet() {
        super();
    }
    
    @Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	request.setAttribute("data", false);
		createGETRequestDispatcher(request).forward(request, response);	// Forward the request to the view
	}
	
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setAttribute("data", true);
		// TODO Add data from URL ? || Data fwds straight through
		// request.getParameter("smth");
		createPOSTRequestDispatcher(request).forward(request, response);
	}

	@Override
	protected String getPOSTPageURL() {
		return "pages/timer.html";
	}

	@Override
	protected String getGETPageURL() {
		return "pages/timer.html";
	}

	@Override
	protected String getPUTPageURL() {
		return null;
	}

	@Override
	protected String getDELETEPageURL() {
		return null;
	}



}

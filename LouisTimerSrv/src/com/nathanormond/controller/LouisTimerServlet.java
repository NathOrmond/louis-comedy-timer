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
@WebServlet("/LouisTimerServlet")
public class LouisTimerServlet extends AbstractHttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public LouisTimerServlet() {
        super();
    }
    
    /**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		createGETRequestDispatcher(request).forward(request, response);	// Forward the request to the view
	}

	@Override
	protected String getPOSTPageURL() {
		return null;
	}

	@Override
	protected String getGETPageURL() {
		return "Pages/Timer.html";
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

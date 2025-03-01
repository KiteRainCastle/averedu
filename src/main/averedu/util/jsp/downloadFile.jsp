<%@ page contentType="text/html;charset=utf-8" pageEncoding="utf-8" %>
<%@ page language="java"%>
<%@ page import="java.net.URLDecoder"%>
<%@ page import="java.net.URLEncoder"%>
<%@ page import="java.io.BufferedInputStream"%>
<%@ page import="java.io.FileInputStream"%>
<%@ page import="java.io.File"%>
<%@ page import="java.io.IOException"%>
<%@ page import="javax.servlet.ServletException"%>
<%@ page import="javax.servlet.ServletOutputStream"%>
<%@ page import="javax.servlet.http.HttpServletRequest"%>
<%@ page import="javax.servlet.http.HttpServletResponse"%>
<%@ page import="com.msu.common.util.XSSUtil"%>

<%
	String userAgent = request.getHeader("User-Agent");
	String isRuntime = "N";

    if (userAgent.indexOf("nexacroplatform14") > -1) {
    	isRuntime = "Y";
    }

	String osName = System.getProperty("os.name");
	
	String savePath = request.getParameter("path");
	String filename = request.getParameter("fileName");
	String saveFileName = request.getParameter("saveFileName");
	
	filename = URLDecoder.decode(filename, "UTF-8");
	//saveFileName = URLDecoder.decode(saveFileName, "UTF-8");
	
	if (osName.indexOf("Window") > -1) savePath.toString().replace('/', '\\');
	
	String filePath = savePath + File.separator + saveFileName;
		
	byte[] buffer = new byte[1024];
	
	ServletOutputStream out_stream	= null;
	BufferedInputStream in_stream	= null;
	
	File fis = new File(XSSUtil.cleanPathMani(filePath));
	
	if(fis.exists()) {
		try {
			response.setContentType("application/octet;charset=utf-8");
			
			if(isRuntime != null && isRuntime.equals("N")) {
				
				if(userAgent.indexOf("MSIE") > -1) {
					//String encodeFileName = java.net.URLEncoder.encode(filename, "utf-8").replaceAll("\\+", "\\ ");
					response.setHeader("Content-Disposition", "attachment; filename = \"" + URLEncoder.encode(filename, "UTF-8") + "\"");
					response.setHeader("Content-Transper-Encoding", "binary");
				} else {
					response.setHeader("Content-Disposition", "attachment; filename = \"" + URLEncoder.encode(filename, "UTF-8") + "\"");
				}				

				response.setHeader("Content-Transper-Encoding", "binary");
				response.setHeader("Content-Length", "" + String.valueOf(fis.length()));
				response.setHeader("Pargma", "no-cache");
				response.setHeader("Expires", "-1");
			} else {
				response.setHeader("Content-Disposition", "attachment; filename = \"" + URLEncoder.encode(filename, "UTF-8") + "\"");
				response.setHeader("Content-Transper-Encoding", "binary");
				response.setHeader("Content-Length", "" + String.valueOf(fis.length()));				
			}

			out.clear();
			out = pageContext.pushBody();	
			
			out_stream = response.getOutputStream();
			in_stream = new BufferedInputStream(new FileInputStream(fis));
	
			int n = 0;
			while ((n = in_stream.read(buffer, 0, 1024)) != -1) {
				out_stream.write(buffer, 0, n);
			}
		} catch(Exception e) {
			e.printStackTrace();
		} finally {
			if(in_stream != null) {
				try {
					in_stream.close();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			
			if(out_stream != null) {
				try {
					out_stream.close();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
	} else {
		System.out.println("fileDownload filename==>"+filename + ", 파일없음.");
		response.sendRedirect("unknownfile");
	}
%>

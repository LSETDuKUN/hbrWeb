<%@ page import="java.sql.*" %><%--
  Created by IntelliJ IDEA.
  User: Lenovo
  Date: 2025/8/18
  Time: 16:15
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="hbr.HbrDao" %>
<%@ page import="hbr.Team" %>
<%@ page import="java.util.ArrayList" %>
<html>
<head>
    <title>数据管理</title>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
</head>
<body>
<table>
    <tr>
        <th>部队编号</th>
        <th>部队名</th>
    </tr>
    <%
        hbr.HbrDao hbrDao = new HbrDao();
        String team = hbrDao.searchTeById(1);
    %>
    <tr>
        <td>1</td>
        <td><%=team%></td>
    </tr>
</table>
</body>
</html>

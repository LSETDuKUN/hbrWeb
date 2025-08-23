package hbr;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class TeamServlet extends HttpServlet {
    private HbrDao hbrDao = new HbrDao();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setContentType("application/json;charset=UTF-8");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

        try {
            String idParam = request.getParameter("id");
            if (idParam == null || idParam.trim().isEmpty()) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                out.print("{\"error\":\"缺少id参数\"}");
                return;
            }

            int teamId = Integer.parseInt(idParam);
            String teamName = hbrDao.searchTeById(teamId);

            if (teamName != null && !teamName.trim().isEmpty()) {
                String jsonResponse = String.format(
                        "{\"success\":true,\"id\":%d,\"name\":\"%s\"}",
                        teamId, teamName
                );
                out.print(jsonResponse);
            } else {
                response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                out.print("{\"error\":\"未找到指定的队伍\"}");
            }

        } catch (NumberFormatException e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.print("{\"error\":\"ID必须是数字\"}");
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.print("{\"error\":\"服务器内部错误: " + e.getMessage() + "\"}");
        } finally {
            out.flush();
            out.close();
        }
    }
}
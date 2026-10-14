import java.io.IOException;
import java.sql.*;
import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class MatchmakingServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String currentSessionUserId = (String) request.getSession().getAttribute("student_id");
        try {
            Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/skill_exchange_db", "root", "");
            String sqlQuery = "SELECT s.FullName, s.AcademicDepartment, e.OfferedSkillID, e.RequestedSkillID, e.PeerConnectionID " +
                              "FROM student s JOIN exchange_request e ON s.StudentID = e.StudentID " +
                              "WHERE s.StudentID != ?";
            PreparedStatement pstmt = conn.prepareStatement(sqlQuery);
            pstmt.setString(1, currentSessionUserId);
            ResultSet rs = pstmt.executeQuery();

            request.setAttribute("activeRequests", rs);
            RequestDispatcher dispatcher = request.getRequestDispatcher("dashboard.jsp");
            dispatcher.forward(request, response);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

/**
 * Created by keatonfoster on 3/4/16.
 */
public class Main {

    public static void createTables (Connection conn) throws SQLException {
        Statement stmt = conn.createStatement();
        stmt.execute("CREATE TABLE IF NOT EXISTS user (user_Id INT, user_name VARCHAR, password VARCHAR)");
        stmt.execute("CREATE TABLE IF NOT EXISTS recipe (recipe_id INT, recipe_join-id INT, recipe_name");
    }

    public static void main(String[] args) {

    }
}

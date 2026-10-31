import { pool } from "./config/db";

try {
    const res = await pool.query("SELECT 1");
    console.log(res.rows);
} catch (err) {
    console.log(err);
} finally {
    pool.end();
}

import dotenv from 'dotenv'
import path from 'path'
dotenv.config({path:path.join(process.cwd(), '.env')})
const config={
    CONNECTION_STR:process.env.CONNECTING_STR,
    PORT:process.env.PORT
}

export default config
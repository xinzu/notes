import { series, parallel } from "gulp";

// 串行
export default series(
    () => {
        console.log("打包")
    }
)

// 并行
// export default parallel()
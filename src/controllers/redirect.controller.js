import { URL } from "../models/url.model.js";

const code = async (req, res) => {
    try {
        const { code } = req.params;

        console.log(code)
        const url = await URL.findOne({
            urlCode: code
        });
        if (url) {
            return res.redirect(url.longUrl);
        } else {
            return res.status(404).json('No URL Found');
        }

    }
    catch (err) {
        console.error(err);
        res.status(500).json('Server Error');
    }
}

export {
    code
}
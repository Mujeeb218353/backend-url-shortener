import validUrl from "valid-url";
import { URL } from "../models/url.model.js";
import { generateShortId } from "../utils/utils.js";
const baseUrl = process.env.BASEURI;

const generateUniqueShortId = async () => {
    let shortId;
    let existingURL;

    while (true) {
        shortId = generateShortId();
        existingURL = await URL.findOne({ urlCode: shortId });

        if (!existingURL) {
            break;
        }
    }
    return shortId;
};

const urlShortener =  async (req, res) => {
    const { longUrl, urlCode } = req.body;

    try {
        if (!validUrl.isUri(longUrl)) {
            return res.status(401).json({ error: "Invalid Url" });
        }

        if (urlCode) {
            const existingCodeBookmark = await URL.findOne({ urlCode });

            if (existingCodeBookmark) {
                return res.status(400).json({ error: `Code ${urlCode} already in use. Please choose a different code.` });
            }
        }

        const existingURL = await URL.findOne({ longUrl });

        if (existingURL && !urlCode) {
            return res.json({ urlCode: existingURL.urlCode });
        }

        const generatedCode = urlCode || await generateUniqueShortId();
        const shortUrl = `${baseUrl}/${generatedCode}`;

        const newURL = new URL({
            urlCode: generatedCode,
            longUrl,
            shortUrl,
        });

        await newURL.save();
        res.status(201).json({ urlCode: generatedCode });
    } catch (error) {
        console.error('Error shortening URL:', error);
        res.status(500).json({ error: 'Failed to shorten URL' });
    }
}

export { urlShortener };
export default function handler(req, res) {
    switch (req.method) {
        case 'POST':
            break
        default:
            return res.status(404)
    }
}

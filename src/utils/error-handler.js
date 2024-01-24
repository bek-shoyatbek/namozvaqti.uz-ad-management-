
export default function errorHandler(err, req, res, next) {
    if (err) {
        res.status(err.status || 500).send({
            message: err.message
        });
    }
}
export default function (err, req, res, next) {

    console.log(err)
    return res.status(500).json({
        status: 'fail',
        message: err.message,
        err
    })
}
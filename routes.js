
let router = require('express').Router()
const mongoose = require('mongoose')
const Shit = require('./model')

// Set default API response
// router.get('/', function (req, res) {
//     res.json({
//         status: 'API Its Working',
//         message: 'Welcome to SHIT_Hub crafted with love!',
//     });
// });

router.get('/',async (req, res) => {//to ->get all the recent added shit
    // pagination...>
    const {page, perPage} = req.query;
    const options = {
        page: parseInt(page, 10),
        limit:parseInt(perPage, 10)
    }
    const shit = await Shit.paginate(Shit.find({}).sort({date: -1}),options);
    res.json(shit);
});

router.get('/top',async (req, res) => {//to ->get all top
    // pagination...>
    const {page, perPage} = req.query;
    const options = {
        page: parseInt(page),
        limit:parseInt(perPage)
    }
    const shit = await Shit.paginate(Shit.find({}).sort({key: -1}),options);
    res.json(shit);
    // Shit.find({}).sort({key: -1}).exec( function(err,docs){
    //     res.status(200).json(docs)
    // });

})

// ??default (maybe)
router.get('/catagory', (req, res) => {
    var url = [
        "https://i.ytimg.com/vi/eHffoZiZ8Hc/hqdefault.jpg",
        // 1 -> Trending
        "https://images.desimartini.com/media/uploads/2015-5/fotorcreated_zmrLKEp.jpg",
        // 2 -> Movies
        "https://i.ytimg.com/vi/LasGGVTW8oY/hqdefault.jpg",
        // 3 -> politics
        "http://thewisegender.com/wp-content/uploads/2018/12/PUBG-Mobile.jpg",
        // 4 -> Games
        "https://images.pexels.com/photos/1682852/pexels-photo-1682852.jpeg?auto=compress&cs=tinysrgb&h=650&w=940 1x",
        // 5 -> Sarcasm
        "https://i10.dainikbhaskar.com/thumbnails/730x548/web2images/www.bhaskar.com/2019/01/12/hardik-pandya-asked-kjo-t.jpg" 
        // 5 -> Desi
    ];    
    res.status(200).json({url})
});

router.get('/catagory/:cat_id', (req, res) => {
    // pagination...>
    Shit.find({}).where({catagory: req.params.cat_id,  }).sort({key: -1}).exec( function(err,docs){
        res.status(200).json({docs})
    });
});

router.post('/', (req, res) => {//to <-post the shit []
    const shit = new Shit({
        _id: new mongoose.Types.ObjectId(),
        url: req.body.url,
        catagory: req.body.catagory,
        // key : req.body.key // need to clear this 
    });
    shit.save().then(
        result => res.json(result)
    );

});

    // operation on shit
router.get('/:shit_id', (req, res) => {//to ++-> the key of a shit id
    const id = req.params.shit_id;
    let shit = Shit.findOne({_id: id});
    Shit.update({$inc: { key: 1 }})
    .exec(function(err, foundObject) {
    if (err) {
      console.log(err);
  }});
  res.status(200).send();
});

router.delete('/:shit_id', (req, res) => {//to [x] the shit _desired_ by id
    const id = req.params.shit_id;
    Shit.remove({_id: id}).exec()
        .then(result => {
            res.status(200).json({result});
        })
        .catch(err => res.status(500).json(err));
});

router.delete('/confirm', (req, res) => {//to [x] the shit _desired_ by id
    const id = req.params.shit_id;
    Shit.remove({}).exec();
    res.json("deleted");
});






// Export API routes
module.exports = router;
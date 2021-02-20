const Sauce = require('../models/sauce');
const fs =require('fs');
// Importation du package xss-filters pour contrer les attaques d'injections
const xssFilters = require('xss-filters');

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(xssFilters.inHTMLData(req.body.sauce));
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce.save()
    .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce modifiée!'}))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauces => {
      const filename = sauces.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(404).json({ error }));
};

exports.getAllSauce = (req, res, next) => {
  Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};

exports.likeSauce = (req, res, next) =>{
  switch (req.body.like) {
      //Clique sur Like et mise à jour du nombre de like
        case 1:
            Sauce.updateOne({_id: req.params.id}, {
                _id: req.params.id,
                $inc: {likes: + req.body.like},
                $push: {usersLiked: req.body.userId},
            })
            .then(() => res.status(201).json({message: "Like enregistré !"}))
            .catch(error => res.status(400).json({error}));
            break;
      //Clique sur Dislike et mise à jour du nombre de dislike
        case -1:
            Sauce.updateOne({_id: req.params.id}, {
                _id: req.params.id,
                $inc: {dislikes: + req.body.like * -1},
                $push: {usersDisliked: req.body.userId},
            })
            .then(() => res.status(201).json({message: "Dislike enregistré !"}))
            .catch(error => res.status(400).json({error}));
            break;
      //Annulation du like ou du dislike
        case 0:
            Sauce.findOne({_id: req.params.id})
                .then(sauce => {

                //Annulation du like et mise à jour du nombre de like
                    if (sauce.usersLiked.indexOf(req.body.userId) !== -1) {
                        Sauce.updateOne({_id: req.params.id}, {
                            _id: req.params.id,
                            $inc: {likes: -1},
                            $pull: {usersLiked: req.body.userId},
                        })
                        .then(() => res.status(201).json({message: "Annulation du like enregistrée !"}))
                        .catch(error => res.status(400).json({error}));
                    }
                //Annulation du Dislike et mise à jour du nombre de dislike
                    if (sauce.usersDisliked.indexOf(req.body.userId) !== -1) {
                        Sauce.updateOne({_id: req.params.id}, {
                            _id: req.params.id,
                            $inc: {dislikes: -1},
                            $pull: {usersDisliked: req.body.userId}
                        })
                        .then(() => res.status(201).json({message: "Annulation du dislike enregistrée !"}))
                        .catch(error => res.status(400).json({error}));
                    }
                })
                .catch(error => res.status(500).json({error}));
            break;
        default:
            throw error;
        }
};

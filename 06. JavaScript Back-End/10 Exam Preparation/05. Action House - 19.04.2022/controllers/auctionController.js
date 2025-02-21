const router = require("express").Router();
const User = require("../models/User");

const { hasUser, isOwner } = require("../middleware/guards");
const {
  getAll,
  create,
  getById,
  auctionBidder,
  edit,
  deleteAuction,
  getUserAuction,
  getAllClosed,
  createClosedAuction,
  closedAuctions,
} = require("../services/auctionServices");
const { getErrorMessage } = require("../utils/errorUtils");
const { generateOptions } = require("../utils/optionUtils");

router.get("/catalog", async (req, res) => {
  const auctions = await getAll();
  res.render("auction/catalog", { title: "Catalog Page", auctions });
});

router.get("/create", hasUser(), async (req, res) => {
  res.render("auction/create", { title: "Create Auction Page" });
});

router.post("/create", hasUser(), async (req, res) => {
  try {
    const auction = {
      title: req.body.title,
      category: req.body.category,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      description: req.body.description,
      author: req.user._id,
    };
    console.log(auction);
    await create(auction);
    res.redirect("/auction/catalog");
  } catch (error) {
    return res.render("auction/create", { error: getErrorMessage(error) });
  }
});

router.get("/details/:id", async (req, res) => {
  const auction = await getById(req.params.id);

  if (!auction) {
    throw new Error("Course not found!");
  }

  auction.isOwner = req.user && auction.author == req.user._id ? true : false;
  auction.isBidder = req.user && auction.bidder == req.user._id ? true : false;
  if (auction.isOwner && auction.bidder.length == 0) {
    res.render("auction/details-owner", { auction });
  } else if (auction.isOwner) {
    auction.isBidder = true;
    const user = await getUserAuction(auction.bidder);
    const bidUser = Object.assign(
      user.map((b) => `${b.firstName} ${b.lastName}`)
    );
    res.render("auction/details-owner", { auction, bidUser });
  } else {
    res.render("auction/details", { auction });
  }
});

router.get("/bid/:id", hasUser(), async (req, res) => {
  const auction = await getById(req.params.id);

  try {
    if (auction.owner == req.user._id) {
      auction.isOwner = true;
      return res.render(`auction/details`, {
        auction,
        error: "Cannot bid for your own auction",
      });
    }

    if (auction.isBidder == req.user._id) {
      auction.isBidder = true;
      return;
    } else if (req.query.amout > auction.price) {
      await auctionBidder(req.params.id, req.user._id, req.query.amout);
      res.redirect(`/auction/details/${req.params.id}`);
    } else {
      throw new Error("You cannot bid with less or equal amout than current");
    }
  } catch (error) {
    return res.render(`auction/details`, {
      auction,
      error: getErrorMessage(error),
    });
  }
});

router.get("/edit/:id", isOwner(), hasUser(), async (req, res) => {
  let auction = await getById(req.params.id);
  const options = generateOptions(auction.category);

  res.render("auction/edit", { auction, options });
});

router.post("/edit/:id", isOwner(), hasUser(), async (req, res) => {
  const { title, category, imageUrl, price, description } = req.body;
  await edit(req.params.id, { title, category, imageUrl, price, description });

  res.redirect(`/auction/details/${req.params.id}`);
});

router.get("/delete/:id", isOwner(), hasUser(), async (req, res) => {
  await deleteAuction(req.params.id);

  res.redirect("/auction/catalog");
});

router.get("/closed/:id", async (req, res) => {
  const auction = await getById(req.params.id);
  const user = await getUserAuction(auction.bidder);
  const bidUserFirstName = Object.assign(user.map((b) => b.firstName))[0];
  const bidUserLastName = Object.assign(user.map((b) => b.lastName))[0];

  await closedAuctions(
    auction,
    req.params.id,
    bidUserFirstName,
    bidUserLastName
  );
  res.redirect("/auction/catalog");
});

module.exports = router;

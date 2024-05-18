const { Catalog, Cart } = require("../models/config");
const session_controller = require("./session_controller");

const index_controller = async (req, res) => {
    const usercheck = await session_controller.check_session_controller(
        req,
        res
    );

    const page = "index";
    const allData = { usercheck };
    console.log(allData);
    res.render(page, allData);
};
const catalog_controller = async (req, res) => {
    const usercheck = await session_controller.check_session_controller(
        req,
        res
    );
    const page = "catalog";
    const data = await Catalog.findAll({ raw: true });
    const allData = { data, usercheck };
    res.render(page, allData);
};
const where_controller = async (req, res) => {
    const usercheck = await session_controller.check_session_controller(
        req,
        res
    );
    const page = "where";
    const allData = { usercheck };
    res.render(page, allData);
};
const profile_controller = async (req, res) => {
    const usercheck = await session_controller.check_session_controller(
        req,
        res
    );
    const result_cart = await cart_controller(req, res);

    const cart = result_cart.map((cartItem) => cartItem.dataValues.id_item);

    const page = "profile";

    const allData = { usercheck, cart, result_cart };
    res.render(page, allData);
};

const filter_catalog_controller = async (req, res) => {
    const usercheck = await session_controller.check_session_controller(
        req,
        res
    );
    const page = "catalog";
    const { category } = req.body;
    console.log(category);

    if (category == "All") {
        const data = await Catalog.findAll({
            raw: true,
        });
        const allData = { data, usercheck };
        res.render(page, allData);
    } else {
        const data = await Catalog.findAll({
            where: { category: category, toggle: true },
        });
        const allData = { data, usercheck };

        res.render(page, allData);
    }
};
const addcart_controller = async (req, res) => {
    console.log(req.body);
    const { item, name, price } = req.body;
    const user_email = req.session.email;
    Catalog.update(
        {
            toggle: false,
        },
        { where: { id: item } }
    );
    Cart.create({
        id_item: item,
        email_user: user_email,
        name,
        price,
    });
    catalog_controller(req, res);
};
const cancel_reserve_controller = async (req, res) => {
    const { id, id_item } = req.body;
    console.log(req.body);
    try {
        await Catalog.update(
            {
                toggle: true,
            },
            { where: { id: id_item } }
        );
        await Cart.destroy({ where: { id_item: id_item } });
        profile_controller(req, res);
    } catch (error) {
        console.error("Error deleting user:", error);
    }
};

const cart_controller = async (req, res) => {
    const user_email = req.session.email;
    const cart = await Cart.findAll({
        where: { email_user: user_email },
    });
    return cart;
};

const cart_cards_get = (item) => {
    const thisid = item;
    const cardsData = Catalog.findOne({ where: { id: thisid } });
    return cardsData;
};

module.exports = {
    index_controller,
    catalog_controller,
    where_controller,
    filter_catalog_controller,
    profile_controller,
    addcart_controller,
    cancel_reserve_controller,
};


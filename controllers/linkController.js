const links = require('../models/link');

module.exports.RenderNewLinkPage = (req,res)=>{
    res.render('links/new')
};

module.exports.GetLink = async (req, res) => {
  let { category, search, page } = req.query;

  category = category ? decodeURIComponent(category) : null;
  search = search ? decodeURIComponent(search) : null;

  if (search) {
    const Link = await links.find({
      title: { $regex: search, $options: 'i' }
    });

    return res.render('links/home', {
      Link,
      category,
      currentPage: null,
      totalPages: null
    });
  }
  page = parseInt(page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  const query = category ? { category } : {};

  const [Link, totalCount] = await Promise.all([
    links.find(query).skip(skip).limit(limit),
    links.countDocuments(query)
  ]);

  const totalPages = Math.ceil(totalCount / limit);

  res.render('links/home', {
    Link,
    category,
    currentPage: page,
    totalPages
  });
};

module.exports.CreateNewLink = async (req,res)=>{
    const { title, category, link } = req.body;
    if (!title || !category || !link) {
        req.flash('error', 'All fields are required.');
        return res.redirect('/link/new');
    }
    const Link = new links({ title, category, link });
    await Link.save();
    req.flash('success','Added successfully');
    res.redirect('/link')
}

module.exports.RenderEditLinkPage = async(req,res)=>{
    const { id } = req.params;
    const Link = await links.findById(id)
    res.render('links/edit',{Link})
}

module.exports.EditLink = async(req,res)=>{
    const {id} = req.params;
    const { title, category, link } = req.body;
    const Link = await links.findByIdAndUpdate(id, { title, category, link }, { new: true, runValidators: true });
    req.flash('success','Edited successfully');
    res.redirect('/link')
}

module.exports.DeleteLink = async(req,res)=>{
    const Link = await links.findByIdAndDelete(req.params.id)
    req.flash('error','Deleted successfully');
    res.redirect('/link')
}
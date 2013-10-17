/**
 * Created with JetBrains WebStorm.
 * User: ksondere
 * Date: 9/27/13
 * Time: 12:19 AM
 * To change this template use File | Settings | File Templates.
 */
var youTubeVideos = [
    {title: "Rihanna - Stay ft. Mikky Ekko - (Mayday RED cover)", image: "stay.jpg", id: "0xPaxHen9AA", index: 1},
    {title: "COLDPLAY- PRINCESS OF CHINA ft. Rihanna - Mayday RED cover", image: "princess-of-china.png", id: "g842uFcnH0E", index: 2},
    {title: "DON'T YOU WORRY CHILD -- Swedish House Mafia - Mayday RED Cover", image: "dont-you-worry-child.png", id: "5XpQDmRefs4", index: 3},
    {title: "Everything Has Changed - Taylor Swift, ft Ed Sheeran Remix - Mayday RED acoustic cover", image: "everything-has-changed.png", id: "lzcMrR4JxoQ", index: 4},
    {title: "STRATOSPHERE -- Mayday RED [Dubstep Fusion - original song] - (Official Music Video)", image: "stratosphere.png", id: "6Kx4MFutWkM", index: 5},
    {title: "The Civil Wars - Poison & Wine - LIVE (Mayday RED)", image: "images/poison-and-wine.png", id: "U4mULLmihdA", index: 6},
    {title: "GET OVER IT -- Mayday RED (original song) ft. Insane Parkour by Ronnie Shalvis!!", image: "get-over-it.png", id: "91tAK5FvgSE", index: 7}
];

Template.postsList.helpers({
    posts: youTubeVideos
})

Template.showIndicators.helpers({
    indicators: youTubeVideos
})




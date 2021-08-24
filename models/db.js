const Sequelize = require("sequelize");

let db;

let dbURL = process.env.DATABASE_URL;
if (!dbURL) {
    db = new Sequelize("postgres://kylegilbert@localhost:5432/walkumentarysyracusecic", {
        logging: false,
        dialect: "postgres",
        protocol: "postgres"
    });
} else {
    db = new Sequelize(dbURL, {
        logging: false,
        dialect: "postgres",
        protocol: "postgres",
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false, // very important
            }
        }
    });
}

const Site = require("./Site")(db);
const Location = require("./Location")(db);
const Photo = require("./Photo")(db);
const SoundEffect = require("./SoundEffect")(db);
const TextCredit = require("./TextCredit")(db);

(async () => {
    await db.authenticate();
    console.log("Walkumentary Syracuse database is connected");

    Site.hasOne(Location, {foreignKey: "siteID"});
    Site.hasMany(Photo, {foreignKey: "siteID"});
    Site.hasMany(SoundEffect, {foreignKey: "siteID"});
    Site.hasMany(TextCredit, {foreignKey: "siteID"});

    await db.sync(); // when adding columns: db.sync({force: true})

    const sites = await Site.findAll();
    if (sites.length === 0){
        const fayetteParkSitePage = await Site.create({
            name: "Fayette Park",
            text: "<p mt-0>The area surrounding Fayette Park was home to several abolitionists, and the park and houses around it witnessed some significant events.</p><p>On Sunday, July 30, 1843, the great American orator and abolitionist Frederick Douglass spoke near the north side of the park, in front of the home of Stephen & Rosa Smith, who had invited him to speak there after they found out that he hadn’t been able to book a hall to speak in during his visit to Syracuse. His small audience grew to 500 by the afternoon. That evening the First Congregational Church offered Douglass and his audience a building to continue their activities for three more days. The speech on July 30 was one of many Douglass would give in Syracuse over the years, including another in Fayette Park in 1847.</p><p>Douglass had formerly been enslaved in Maryland, where he taught himself to read and write and then taught other enslaved Americans. He escaped slavery in 1838, and went on to become a prominent activist, starting an abolitionist newspaper in his new home of Rochester. He authored 5 books, the first of which was his famed autobiography, “Narrative of the Life of Frederick Douglass, an American Slave”. He became the first African-American to hold high office when he was appointed ambassador to Haiti in 1889, a position he held for two years. His advocacy for the rights of African-Americans and Women have been an inspiration to subsequent generations of people working for equality. You can hear a portion of his famous speech “What to the Slave is 4th of July?” by clicking the button.</p><p>Charles & Ellen Wheaton also lived on the north side of the park. Charles was a successful businessman and built the Wheaton Block on South Salina & Water Streets. In 1838 the Wheatons were part of a group that left the First Presbyterian Church to found the First Congregational Church, because the former refused to take an official position against slavery. Their home was a stop on the Underground Railroad from 1839 - 1847. Charles took an active stand against the 1850 Fugitive Slave Act, which required all US citizens to support the capture of those who had escaped enslavement even in the northern states where slavery was illegal. He was also part of a group of citizens who rescued William “Jerry” Henry, who had escaped slavery and was captured in Syracuse and jailed in a building that stood at what is now Clinton Square, which is another stop on this tour. Charles’ wife Ellen Birdseye Wheaton kept a diary from 1850 to her death in 1858, which was published in 1923. It details her family and social life as well as her reform activities, and includes comments on events in Syracuse’s abolitionist movement and the women’s rights movement.</p><p>Hamilton White and his wife Adelaide lived in the only home from that era that still stands today. It’s the large red brick Greek Revival mansion on the east side of the park, next to the church. White was a merchant and philanthropist who gave to many causes, including African-American churches and the Underground Railroad. He took a public stand against the Kansas-Nebraska Act in 1854, which expanded slavery in the west. His brother Horace is believed to have been directly involved in the Underground Railroad.</p>",
            audioNarrationURL: "/audio/fayetteParkNarration.mp3"});

        await Location.create({
            siteID: fayetteParkSitePage.siteID,
            latForMapDisplay: 43.0484000,
            lngForMapDisplay: -76.1467240,
            latForGeolocation: 43.0477889,
            lngForGeolocation: -76.1493098,
            popUpDescription: "Home to several prominent abolitionists, and site of speeches by Frederick Douglass.",
            timesVisited: 0
        });

        await Photo.create({
            siteID: fayetteParkSitePage.siteID,
            url: "https://s3.amazonaws.com/gs-waymarking-images/c0643fe2-93dc-48fa-98c9-2d56f43353aa.jpg",
            caption: "Fayette Park today",
            credit: "Waymarking",
            creditURL: "https://www.waymarking.com/gallery/image.aspx?f=1&guid=a2739476-4c13-4d23-b5ce-c01c2c14d85a",
            altTag: "View of modern day Fayette Park though the gate"
        });
        await Photo.create({
            siteID: fayetteParkSitePage.siteID,
            url: "/images/fayettePark1906.jpg",
            caption: "Fayette Park in 1906",
            credit: "Detroit Publishing Co.",
            creditURL: "https://picryl.com/media/fayette-park-syracuse-ny-ac08ed",
            altTag: "Fayette Park in 1906"
        });
        await Photo.create({
            siteID: fayetteParkSitePage.siteID,
            url: "/images/frederickDouglass.jpg",
            caption: "Frederick Douglass",
            credit: "Artist unknown",
            creditURL: "https://www.flickr.com/photos/elycefeliz/6021102737",
            altTag: "Portrait of Frederick Douglass"
        });
        await Photo.create({
            siteID: fayetteParkSitePage.siteID,
            url: "/images/hamiltonWhiteHouse.jpg",
            caption: "Home of Hamilton White",
            credit: "Doncram",
            creditURL: "https://commons.wikimedia.org/wiki/File:HamiltonWhiteHouse4sm.jpg",
            altTag: "large brick greek revival home that belonged to Hamilton White"
        });

        await SoundEffect.create({
            siteID: fayetteParkSitePage.siteID,
            name: "Play Narration",
            caption: "",
            url: "/audio/fayetteParkNarration.mp3",
            credit: "",
            creditURL: ""
        });
        await SoundEffect.create({
            siteID: fayetteParkSitePage.siteID,
            name: "Douglass Speech",
            caption: "Hear an excerpt from Frederick Douglass' speech 'What to a Slave Is 4th of July?' by clicking the button above.",
            url: "/audio/frederickDouglass.mp3",
            credit: "James Earl Jones and Democracy Now",
            creditURL: "https://youtu.be/O0baE_CtU08?t=60"
        });
        await SoundEffect.create({
            siteID: fayetteParkSitePage.siteID,
            name: "Horse & Carriage",
            caption: "",
            url: "/audio/freeSoundCanadianHorseAndCarriage.mp3",
            credit: "vero.marengere",
            creditURL: "https://freesound.org/people/vero.marengere/sounds/450325/"
        });
        
        await TextCredit.create({
            siteID: fayetteParkSitePage.siteID,
            credit: "Historical Marker by Preserve New York",
            url: "https://www.hmdb.org/m.asp?m=138793"
        });
        await TextCredit.create({
            siteID: fayetteParkSitePage.siteID,
            credit: "Free Thought Trail",
            url: "https://freethought-trail.org/trail-map/location:fayette-park/"
        });
        await TextCredit.create({
            siteID: fayetteParkSitePage.siteID,
            credit: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Charles_Augustus_Wheaton"
        });
        await TextCredit.create({
            siteID: fayetteParkSitePage.siteID,
            credit: "Preservation Association of Central New York",
            url: "https://pacny.net/freedom_trail/birdseye_wheaton.htm"
        });
        await TextCredit.create({
            siteID: fayetteParkSitePage.siteID,
            credit: "Mathew Powerrs and Clio Admin. 'Hamilton White House.' Clio: Your Guide to History. April 17, 2019",
            url: "https://theclio.com/entry/78574"
        });
        await TextCredit.create({
            siteID: fayetteParkSitePage.siteID,
            credit: "The History Channel",
            url: "http://www.history.com/topics/black-history/frederick-douglass"
        });
        await TextCredit.create({
            siteID: fayetteParkSitePage.siteID,
            credit: "The White House Historical Association",
            url: "https://www.whitehousehistory.org/frederick-douglass"
        }); 

        const cityHallSitePage = await Site.create({
            name: "City Hall",
            text: "<p mt-0>The historic first Woman’s Rights Convention that took place in Seneca Falls in 1848 was followed by several other local conventions. It then became a national Woman’s Rights Convention and an annual event in 1850. The third annual convention was held here in Syracuse at City Hall in 1852. It was not held in the current building, which was completed in in 1892, but in the original building pictured in the second and third photos. At the time of the convention, the bell tower in the photos had not yet been added.</p><p>The Syracuse convention was attended by 2000 people who traveled from eight US states and Canada. Poet and activist Elizabeth Oakes Smith addressed the crowd with the following words 'our aim is nothing less than … that every American citizen, whether man or woman, may have a voice in the laws by which we are governed.' </p><p>The convention was the first attended by two important women in the movement, Susan B. Anthony and Matilda Joslyn Gage.</p><p>Susan B. Anthony came to the convention as an agent for Amelia Bloomer’s temperance newspaper, and did not speak at the convention. The previous year it had been Amelia Bloomer who introduced Anthony to Elizabeth Cady Stanton, organizer of the Seneca Falls convention and coauthor of the Declaration of Sentiments that was signed by the participants of that convention. Anthony was not an ardent supporter of women’s rights at the time, but became one following the Syracuse convention, particularly due to the speech that Lucy Stone delivered there. The most notable part of Stone’s comments were a call for women to resist taxation as long as they are not represented. Anthony and Cady Stanton would go on to work together for women’s rights, with Anthony taking on the bulk of the travel and speaking engagements, and Cady Stanton writing the speeches as well as newspaper articles while raising her children. Anthony would become the most well known suffragist of her time. In 1872 hundreds of women all across the country attempted to vote, but Anthony was the only one arrested as the government chose to make a test case of the most famous suffragist. Her trial was national news.</p><p>Matilda Joslyn Gage, who lived most of her life in nearby Fayetteville, came to the Syracuse convention a full supporter of women’s rights and delivered her first public speech on the subject there. She was an untrained speaker, nervous, and delivered her speech softly, but was encouraged by Lucretia Mott who presided over the convention and moved that the speech be published and circulated as a woman’s rights tract. You can listed to part of Gage’s speech by clicking the button. Gage went on to organize the 1854 convention in Saratoga Springs. In 1869, Anthony, Cady Stanton, and Gage founded the National Woman Suffrage Association together. Gage worked just as tirelessly for the organization as the other two women, in activism, in publication of articles, in running the organization, and in documenting its history. She was co-author of History of Women Suffrage alongside Cady Stanton & Anthony. In the late 1880s when the woman’s rights movement shifted in a more conservative direction and Anthony was more willing to compromise with the temperance movement in leadership, Gage’s role was de-emphasized in history due to her views that were considered too radical for her time. Her home in Fayetteville is now a museum. </p><p>The foundation of the National Woman Suffrage Association in 1869 is an event that had the chance to occur at the Syracuse convention, but did not. A motion to create a permanent national organization to champion women’s rights was voted down. There were concerns that it might hinder the spontaneity and creativity of individual suffragists and result in friction and division.</p><p>The attendees of the Syracuse convention did not live to see their efforts rewarded in 1920, when women gained the right to vote with the passage of the 19th amendment.</p>",
            audioNarrationURL: "/audio/cityHallNarration.mp3"});

        await Location.create({
            siteID: cityHallSitePage.siteID,
            latForMapDisplay: 43.050000,
            lngForMapDisplay: -76.14925000,
            latForGeolocation: 43.0500446,
            lngForGeolocation: -76.1513069,
            popUpDescription: "Site of the Third National Woman's Rights Convention, 1852",
            timesVisited: 0
        });

        await Photo.create({
            siteID: cityHallSitePage.siteID,
            url: "/images/cityHallToday.jpg",
            caption: "City Hall today",
            credit: "Library of Congress",
            creditURL: "https://picryl.com/media/the-1892-city-hall-building-in-syracuse-new-york-967bea",
            altTag: "City Hall today"
        });
        await Photo.create({
            siteID: cityHallSitePage.siteID,
            url: "https://syracuse_walking_tour.s3.amazonaws.com/uploads%2F1376582600741-4-Second-City-Hall-1895-%284%29.jpg",
            caption: "The original City Hall building with the bell on the front porch before installation",
            credit: "Onondaga Historical Association",
            creditURL: "https://www.cnyhistory.org/",
            altTag: "The original City Hall building with the bell on the front porch before installation"
        });
        await Photo.create({
            siteID: cityHallSitePage.siteID,
            url: "https://syracuse_walking_tour.s3.amazonaws.com/uploads%2F1376582607504-5-Second-City-Hall-1895-%283%29.jpg",
            caption: "The original City Hall building with the bell installed in the tower",
            credit: "Onondaga Historical Association",
            creditURL: "https://www.cnyhistory.org/",
            altTag: "The original City Hall building with the bell installed in the tower"
        });
        await Photo.create({
            siteID: cityHallSitePage.siteID,
            url: "/images/anthonyAndGage.jpg",
            caption: "Susan B. Anthony (left) and Matilda Joslyn Gage (right)",
            credit: "Both images from Wikipedia, unknown author",
            creditURL: "https://en.wikipedia.org/wiki/Susan_B._Anthony#/media/File:SB_Anthony_from_RoRaWW.jpg", // https://commons.wikimedia.org/wiki/File:MatildaJoslynGage.jpeg
            altTag: "Portraits of Susan B. Anthony and Matilda Joslyn Gage"
        });

        await SoundEffect.create({
            siteID: cityHallSitePage.siteID,
            name: "Play Narration",
            caption: "",
            url: "/audio/cityHallNarration.mp3",
            credit: "",
            creditURL: ""
        });
        await SoundEffect.create({
            siteID: cityHallSitePage.siteID,
            name: "Gage Speech",
            caption: "Hear an excerpt from the speech Matilda Joslyn Gage delivered here by clicking the button above.",
            url: "/audio/gageSpeech.mp3",
            credit: "Kyle Gilbert",
            creditURL: "https://susanb.org/wp-content/uploads/2018/12/Matilda-Joslyn-Gage-Syracuse-NY-1852.pdf"
        });
        await SoundEffect.create({
            siteID: cityHallSitePage.siteID,
            name: "Steam Trains",
            caption: "Hear a steam train like those that ran down nearby Washington Street in the 1800s, by clicking the button above.",
            url: "/audio/freeSoundSteam2.mp3",
            credit: "gadzooks",
            creditURL: "https://freesound.org/people/gadzooks/sounds/39413/"
        });
        
        await TextCredit.create({
            siteID: cityHallSitePage.siteID,
            credit: "She Who Holds the Sky, by Sally Roesch Wagner",
            url: ""
        });
        await TextCredit.create({
            siteID: cityHallSitePage.siteID,
            credit: "City of Syracuse",
            url: "http://www.syracuse.ny.us/History_of_City_Hall.aspx"
        });
        await TextCredit.create({
            siteID: cityHallSitePage.siteID,
            credit: "National Park Service: Susan B. Anthony",
            url: "https://www.nps.gov/people/susan-b-anthony.htm"
        });
        await TextCredit.create({
            siteID: cityHallSitePage.siteID,
            credit: "National Park Service: Elizatbeth Cady Stanton",
            url: "https://www.nps.gov/wori/learn/historyculture/elizabeth-cady-stanton.htm"
        });
        await TextCredit.create({
            siteID: cityHallSitePage.siteID,
            credit: "Free Thought Trail",
            url: "https://freethought-trail.org/historical-events/event:national-womans-rights-convention-of-1852/"
        }); 

        const georgeVashonSitePage = await Site.create({
            name: "George Boyer Vashon Law Office",
            text: "<p mt-0>George Boyer Vashon was a multi-talented man who became the first African-American lawyer in New York State. His law office was located on the second floor of this building from 1851 to 1853. </p><p>By the age of 16, Vashon had learned five languages. In 1844 he became the first African American graduate of Oberlin Collegiate Institute, and received valedictory honors. Following graduation he spent two years studying law under a prominent attorney in Pittsburgh, but despite his qualifications his application to the Allegheny County Bar was denied due to his race. In January 1848 he took the bar exam in New York and was admitted. He received a Masters of Arts degree from Oberlin in 1849, and then moved to Port-au-Prince, Haiti for two years as a professor, and a correspondent for Frederick Douglass’s newspaper The North Star. </p><p>Following his time in Haiti, Vashon lived in Syracuse for four years. </p><p>While here he was active in the Underground Railroad and gave lectures in the African Methodist Episcopal Zion Church. He signed at least one abolitionist petition to Congress, served as a delegate to the Colored Peoples’s Convention in Rochester in 1853, and wrote his epic poem Vincent Og&eacute;. He also drafted resolutions for a meeting of African Americans who were opposed to the establishment of a local colonization society. One read as follows: 'Resolved, that we are opposed to emigration in large bodies to any country, - whether it be to Liberia, Canada, the West Indies, or elsewhere; that we believe our right to remain in this country, to be as indisputable as that of our white fellow citizens; and that our own well-being as well as that of our enslaved brethren at the South, require us to look forward to this land as the place of our burial, as it has been that of our birth.'</p><p>Vashon ran for Attorney General of New York State in 1855. Although he did not win, it was a historic candidacy because he was the first African American to run for statewide office.</p><p>He married Susan Paul Smith in 1857 and they had seven children.</p><p>After he left Syracuse he went on to a series of positions at various colleges while continuing to practice law. He became the first African American professor at Howard University, where he also helped establish the Law School.</p><p>The following are the opening lines of the epic poem he wrote while living in Syracuse. The full text can be found here: <a href='https://allpoetry.com/Vincent-Og'>https://allpoetry.com/Vincent-Og</a> </p><p><strong>Vincent Og&eacute;, by George Boyer Vashon</strong><p><p><em>There is, at times, an evening sky —<br />The twilight's gift — of sombre hue,<br />All checkered wild and gorgeously<br />With streaks of crimson, gold and blue; —<br />A sky that strikes the soul with awe,<br />And, though not brilliant as the sheen,<br />Which in the east at morn we saw,<br />Is far more glorious, I ween; —<br />So glorious that, when night hath come<br />And shrouded it in deepest gloom,<br />We turn aside with inward pain<br />And pray to see that sky again.<br />Such sight is like the struggle made<br />When freedom bids unbare the blade,<br />And calls from every mountain-glen —<br />From every hill — from every plain,<br />Her chosen ones to stand like men,<br />And cleanse their souls from every stain<br />Which wretches, steeped in crime and blood,<br />Have cast upon the form of God.<br />Though peace like morning's golden hue,<br />With blooming groves and waving fields,<br />Is mildly pleasing to the view,<br />And all the blessings that it yields<br />Are fondly welcomed by the breast<br />Which finds delight in passion's rest,<br />That breast with joy foregoes them all,<br />While listening to Freedom's call.</em> </p>",
            audioNarrationURL: "/audio/georgeVashonNarration.mp3"});

        await Location.create({
            siteID: georgeVashonSitePage.siteID,
            latForMapDisplay: 43.0506402,
            lngForMapDisplay: -76.1509000,
            latForGeolocation: 43.0506402,
            lngForGeolocation: -76.1514854,
            popUpDescription: "Office of the first African-American lawyer in New York State",
            timesVisited: 0
        });

        await Photo.create({
            siteID: georgeVashonSitePage.siteID,
            url: "/images/tempScreenshots/danaBlockScreenshot.png",
            caption: "Building that housed George Boyer Vashon's law office on the second floor in the 1850s",
            credit: "",
            creditURL: "",
            altTag: "Building that housed George Boyer Vashon's law office on the second floor in the 1850s"
        });
        await Photo.create({
            siteID: georgeVashonSitePage.siteID,
            url: "https://www.hmdb.org/Photos4/491/Photo491590o.jpg",
            caption: "Portrait of George Boyer Vashon",
            credit: "",
            creditURL: "",
            altTag: "Portrait of George Boyer Vashon"
        });

        await SoundEffect.create({
            siteID: georgeVashonSitePage.siteID,
            name: "Play Narration",
            caption: "",
            url: "/audio/georgeVashonNarration.mp3",
            credit: "",
            creditURL: ""
        });
        await SoundEffect.create({
            siteID: georgeVashonSitePage.siteID,
            name: "Vashon's Poem",
            caption: "Hear an excerpt from Goerge Boyer Vashon's poem 'Vincent Oge' by clicking the button above.",
            url: "/audio/vincentOge.mp3",
            credit: "George Boyer Vashon, read by Kyle Gilbert",
            creditURL: "https://allpoetry.com/Vincent-Og"
        });
        await SoundEffect.create({
            siteID: georgeVashonSitePage.siteID,
            name: "Horse & Carriage",
            caption: "",
            url: "/audio/freeSoundCanadianHorseAndCarriage.mp3",
            credit: "vero.marengere",
            creditURL: "https://freesound.org/people/vero.marengere/sounds/450325/"
        });
        
        await TextCredit.create({
            siteID: georgeVashonSitePage.siteID,
            credit: "AAREG (African American Registry)",
            url: "https://aaregistry.org/story/george-boyer-vashon-had-many-talents/"
        });
        await TextCredit.create({
            siteID: georgeVashonSitePage.siteID,
            credit: "Blackpast.org",
            url: "https://www.blackpast.org/african-american-history/vashon-george-b-1824-1878/"
        });
        await TextCredit.create({
            siteID: georgeVashonSitePage.siteID,
            credit: "Preservation Association of Central New York",
            url: "https://pacny.net/freedom_trail/Vashon.htm"
        });

        const jerryRescueSitePage = await Site.create({
            name: "Jerry Rescue Building",
            text: "<p mt-0>In the fall of 1851, William Henry, commonly known as “Jerry”, had been living in Syracuse for 8 years, working as a cooper. He had escaped enslavement in Missouri, but since the fall of the previous year he had been living under the shadow of the Fugitive Slave Act, which required all US citizens to support the capture of those who had escaped enslavement even in the northern states where slavery was illegal. Many in Syracuse were opposed to the law, and formed a Vigilance Committee.</p><p>On October 1, 1851, Jerry was arrested and taken to the US Commissioner’s Office where he was charged as a fugitive slave. On that same day, there were many people in town for the state convention of an abolitionist political party called the Liberty Party. Church bells were rung and word of Jerry’s arrest spread quickly through the Vigilance Committee. A large crowd, both black and white, gathered in and around the Townsend block where Jerry was being held. They endeavored to free Jerry and he was able to escape down the stairs while still in chains, and made it just past Hanover Square before he was recaptured and shackled. With a broken rib and severe bruising, he was dragged to the police station in the Journal Building, across the street between Water Street and the Erie Canal (now Erie Boulevard).</p><p>Reverend Samuel May of the Unitarian Church, Reverend Jermain Loguen of the AME Zion Church, and 25 other members of the Vigilance Committee met to form a plan. By the time of Jerry’s hearing that evening, a crowd of over 2000 had formed in front of the building. The sheriff feared a riot, and called the National Guard, Syracuse’s Citizens Corps, and the Washington Artillery. The National Guard refused to respond and the Citizens Corps disbanded, leaving the Washington Artillery on their own. Jerry’s trial was postponed until morning, and the Artillery fired blank shots from a cannon to disperse the crowd. In an advantageous twist for the Vigilance Committee’s planned rescue, the fleeing crowd made way for their approach. Armed with iron bars and axes from abolitionist Charles Wheaton’s hardware store, as well as clubs and a battering ram made from a ten foot long pine beam, they broke down the door. Two marshals confronted the rescuers, but they were overpowered. An awaiting carriage drove Jerry to safety, where his shackles were removed and his wounds treated. He was hidden in Syracuse for four days, at the home of a man with a pro-slavery reputation, who sheltered him for humanitarian reasons. The authorities did not think to look for him there. He was transported north to Oswego County and eventually smuggled by ship across Lake Ontario to Canada. The members of the Vigilance Committee who planned the rescue were charged, but none were ever convicted. For many years, abolitionists gathered on the anniversary of the rescue to celebrate the significance of the day.</p>",
            audioNarrationURL: "/audio/jerryRescueNarration.mp3"});

        await Location.create({
            siteID: jerryRescueSitePage.siteID,
            latForMapDisplay: 43.0507377,
            lngForMapDisplay: -76.1534500,
            latForGeolocation: 43.051132,
            lngForGeolocation: -76.156183,
            popUpDescription: "Site of a historic rescue of an imprisoned man who had escaped enslavement and was going to be returned to it.",
            timesVisited: 0
        });

        await Photo.create({
            siteID: jerryRescueSitePage.siteID,
            url: "https://s3.amazonaws.com/gs-waymarking-images/5caeb0a2-86c8-417d-a953-4e4eedd85a5b.jpg",
            caption: "Jerry Rescue Monument, erected in 1990",
            credit: "",
            creditURL: "",
            altTag: "Jerry Rescue Monument"
        });
        await Photo.create({
            siteID: jerryRescueSitePage.siteID,
            url: "/images/tempScreenshots/jerryRescueBldgScreenshot.png",
            caption: "The 'Jerry Rescue building' in 1851 - the police station was on the ground floor of this Journal Building, across the street from Clinton Square.",
            credit: "",
            creditURL: "",
            altTag: "Newspaper illustration of the Jerry Rescue building in 1851"
        });
        await Photo.create({
            siteID: jerryRescueSitePage.siteID,
            url: "http://syracusethenandnow.org/Dwntwn/ClintonSq/JerryRescueB/Townsend_Block_1897.jpg",
            caption: "The Townsend Block, which contained the court where Jerry was first held.",
            credit: "credit",
            creditURL: "url",
            altTag: "Newspaper illustration of the Townsend Block in 1851"
        });
        await Photo.create({
            siteID: jerryRescueSitePage.siteID,
            url: "/images/batteringRam.jpg",
            caption: "Example of a battering ram, Ireland 1888",
            credit: "Robert French",
            creditURL: "https://picryl.com/media/the-battering-ram-has-done-its-work-23392381204-6a2a2e",
            altTag: "1888 photograph of a battering ram in front of a building in rural Ireland"
        });

        await SoundEffect.create({
            siteID: jerryRescueSitePage.siteID,
            name: "Play Narration",
            caption: "",
            url: "/audio/jerryRescueNarration.mp3",
            credit: "",
            creditURL: ""
        });
        await SoundEffect.create({
            siteID: jerryRescueSitePage.siteID,
            name: "Battering Ram",
            caption: "Click the button above to hear a clip of a battering ram like the one used to break down the door of the building Jerry was being held in.",
            url: "/audio/bbcSoundEffectsBatteringRam.mp3",
            credit: "BBC Sound Effects",
            creditURL: "https://sound-effects.bbcrewind.co.uk/search?q=07022371"
        });
        await SoundEffect.create({
            siteID: jerryRescueSitePage.siteID,
            name: "Angry Crowd",
            caption: "",
            url: "/audio/freeSoundAngryCrowd.mp3",
            credit: "bevibeldesign",
            creditURL: "https://freesound.org/people/bevibeldesign/sounds/316640/"
        });
        
        await TextCredit.create({
            siteID: jerryRescueSitePage.siteID,
            credit: "Central New York: A Pictorial History, by Henry W. Schramm",
            url: ""
        });
        await TextCredit.create({
            siteID: jerryRescueSitePage.siteID,
            credit: "Onondaga Historical Association",
            url: "https://www.cnyhistory.org/2014/10/jerry-rescue/"
        });
        await TextCredit.create({
            siteID: jerryRescueSitePage.siteID,
            credit: "Syracuse Then and Now",
            url: "http://syracusethenandnow.org/Dwntwn/ClintonSq/JerryRescue.htm"
        });
        await TextCredit.create({
            siteID: jerryRescueSitePage.siteID,
            credit: "Place of Memory",
            url: "https://motur.wordpress.com/2002/06/15/part-1-a-limited-history-of-black-identity-in-america/"

        });
    };
})();

module.exports = {db, Site, Location, Photo, SoundEffect, TextCredit};
let colorSets = [];

function setupColorSets () {
    let fallRedSet = new ColorSet();
    fallRedSet.treeHueA = [300, 400];
    fallRedSet.treeSatA = [40, 80];
    fallRedSet.treeBriA = [60, 100];

    fallRedSet.treeHueB = [300, 400];
    fallRedSet.treeSatB = [40, 80];
    fallRedSet.treeBriB = [30, 60];

    fallRedSet.landHueUp = [-60, 60];
    fallRedSet.landSatUp = [40, 60];
    fallRedSet.landBriUp = [60, 100];

    fallRedSet.landHueBot = [0, 120];
    fallRedSet.landSatBot = [40, 60];
    fallRedSet.landBriBot = [30, 100];

    fallRedSet.skyHueA = [-60, 60];
    fallRedSet.skyHueB = [240, 360];
    fallRedSet.skyHueC = [0, 120];
    fallRedSet.skyHueD = [180, 300];
    fallRedSet.skySat = [40, 80];
    fallRedSet.skyBri = [60, 100];
    colorSets.push(fallRedSet);


    let blackWhiteSet = new ColorSet();
    blackWhiteSet.treeHueA = [300, 400];
    blackWhiteSet.treeSatA = [0, 0];
    blackWhiteSet.treeBriA = [6, 12];

    blackWhiteSet.treeHueB = [300, 400];
    blackWhiteSet.treeSatB = [0, 0];
    blackWhiteSet.treeBriB = [6, 12];

    blackWhiteSet.landHueUp = [-60, 60];
    blackWhiteSet.landSatUp = [0, 0];
    blackWhiteSet.landBriUp = [40, 80];

    blackWhiteSet.landHueBot = [0, 120];
    blackWhiteSet.landSatBot = [0, 0];
    blackWhiteSet.landBriBot = [10, 60];

    blackWhiteSet.skyHueA = [0, 0];
    blackWhiteSet.skyHueB = [0, 0];
    blackWhiteSet.skyHueC = [0, 0];
    blackWhiteSet.skyHueD = [0, 0];
    blackWhiteSet.skySat = [0, 0];
    blackWhiteSet.skyBri = [0, 60];
    colorSets.push(blackWhiteSet);


    let blueAndGreen = new ColorSet();
    blueAndGreen.treeHueA = [160, 200];
    blueAndGreen.treeSatA = [60, 80];
    blueAndGreen.treeBriA = [40, 100];

    blueAndGreen.treeHueB = [200, 260];
    blueAndGreen.treeSatB = [60, 80];
    blueAndGreen.treeBriB = [20, 80];

    blueAndGreen.landHueUp = [50, 170];
    blueAndGreen.landSatUp = [40, 60];
    blueAndGreen.landBriUp = [60, 100];

    blueAndGreen.landHueBot = [50, 170];
    blueAndGreen.landSatBot = [40, 60];
    blueAndGreen.landBriBot = [60, 100];

    blueAndGreen.skyHueA = [159, 210];
    blueAndGreen.skyHueB = [250, 315];
    blueAndGreen.skyHueC = [70, 173];
    blueAndGreen.skyHueD = [120, 180];
    blueAndGreen.skySat = [40, 60];
    blueAndGreen.skyBri = [30, 80];
    colorSets.push(blueAndGreen);


    let golden = new ColorSet();
    golden.treeHueA = [30, 50];
    golden.treeSatA = [80, 100];
    golden.treeBriA = [80, 100];

    golden.treeHueB = [-60, 60];
    golden.treeSatB = [80, 100];
    golden.treeBriB = [80, 100];

    golden.landHueUp = [-40, 20];
    golden.landSatUp = [80, 100];
    golden.landBriUp = [60, 100];

    golden.landHueBot = [-120, 0];
    golden.landSatBot = [80, 100];
    golden.landBriBot = [20, 60];

    golden.skyHueA = [300, 360];
    golden.skyHueB = [240, 320];
    golden.skyHueC = [-60, 60];
    golden.skyHueD = [300, 360];
    golden.skySat = [60, 80];
    golden.skyBri = [30, 80];
    colorSets.push(golden);


    let lakeGreen = new ColorSet();
    lakeGreen.treeHueA = [160, 180];
    lakeGreen.treeSatA = [80, 100];
    lakeGreen.treeBriA = [80, 100];

    lakeGreen.treeHueB = [180, 220];
    lakeGreen.treeSatB = [80, 100];
    lakeGreen.treeBriB = [60, 80];

    lakeGreen.landHueUp = [160, 190];
    lakeGreen.landSatUp = [30, 60];
    lakeGreen.landBriUp = [60, 100];

    lakeGreen.landHueBot = [180, 220];
    lakeGreen.landSatBot = [60, 80];
    lakeGreen.landBriBot = [40, 80];

    lakeGreen.skyHueA = [160, 180];
    lakeGreen.skyHueB = [200, 240];
    lakeGreen.skyHueC = [200, 240];
    lakeGreen.skyHueD = [160, 180];
    lakeGreen.skySat = [10, 40];
    lakeGreen.skyBri = [80, 100];
    colorSets.push(lakeGreen);

}
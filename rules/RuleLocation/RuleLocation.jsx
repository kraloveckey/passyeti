import { useRef, useState } from 'react';
import styles from "./RuleLocation.module.css";
import Rule from "../Rule";
import ReloadButton from '../../components/ReloadButton';

const locations = {
    'Afghanistan': [34.5289, 69.1725], 'Albania': [41.3275, 19.8189], 'Algeria': [36.7525, 3.042],
    'Andorra': [42.5063, 1.5218], 'Angola': [-8.8399, 13.2894], 'Argentina': [-34.6051, -58.4004],
    'Armenia': [40.182, 44.5146], 'Australia': [-35.2835, 149.1281], 'Austria': [48.2064, 16.3707],
    'Azerbaijan': [40.3777, 49.892], 'Bahamas': [25.0582, -77.3431], 'Bahrain': [26.2154, 50.5832],
    'Bangladesh': [23.7104, 90.4074], 'Barbados': [13.1, -59.6167], 'Belgium': [50.8467, 4.3499],
    'Belize': [17.4975, -88.1956], 'Benin': [6.4952, 2.6288], 'Bermuda': [32.2915, -64.778],
    'Bhutan': [27.4661, 89.6419], 'Bolivia': [-16.5000, -68.1500], 'Bosnia and Herzegovina': [43.8563, 18.4131],
    'Botswana': [-24.6541, 25.9087], 'Brazil': [-15.7797, -47.9297], 'Brunei': [4.8903, 114.9425],
    'Bulgaria': [42.6975, 23.3242], 'Burkina Faso': [12.3714, -1.5197], 'Burundi': [-3.3731, 29.3644],
    'Cambodia': [11.5625, 104.916], 'Cameroon': [3.8667, 11.5167], 'Canada': [45.4166, -75.698],
    'Cape Verde': [14.9331, -23.5133], 'Chad': [12.1348, 15.0557], 'Chile': [-33.4569, -70.6483],
    'China': [39.9042, 116.4074], 'Colombia': [4.6097, -74.0818], 'Comoros': [-11.7022, 43.2540],
    'Congo': [-4.2658, 15.2832], 'Costa Rica': [9.9347, -84.0875], 'Croatia': [45.8144, 15.978],
    'Cuba': [23.1195, -82.3785], 'Cyprus': [35.1856, 33.3823], 'Czech Republic': [50.0755, 14.4378],
    'Denmark': [55.6759, 12.5655], 'Djibouti': [11.5890, 43.1450], 'Dominica': [15.3006, -61.3870],
    'Dominican Republic': [18.4861, -69.9312], 'Ecuador': [-0.1807, -78.4678], 'Egypt': [30.0392, 31.2394],
    'El Salvador': [13.6929, -89.2182], 'Equatorial Guinea': [3.7521, 8.7741], 'Eritrea': [15.3228, 38.9251],
    'Estonia': [59.4370, 24.7536], 'Eswatini': [-26.3054, 31.1367], 'Ethiopia': [9.0054, 38.7578],
    'Fiji': [-18.1416, 178.4415], 'Finland': [60.1692, 24.9402], 'France': [48.8534, 2.3488],
    'Gabon': [0.4170, 9.4675], 'Gambia': [13.4549, -16.5790], 'Georgia': [41.6941, 44.8337],
    'Germany': [52.5244, 13.4105], 'Ghana': [5.556, -0.1969], 'Greece': [37.9534, 23.749],
    'Greenland': [64.1835, -51.7216], 'Grenada': [12.0568, -61.7500], 'Guatemala': [14.6349, -90.5069],
    'Guinea': [9.5716, -13.6476], 'Guyana': [6.8013, -58.1551], 'Haiti': [18.5392, -72.3298],
    'Honduras': [14.0723, -87.1921], 'Hungary': [47.498, 19.0399], 'Iceland': [64.1355, -21.8954],
    'India': [28.6667, 77.2167], 'Indonesia': [-6.2118, 106.8416], 'Iraq': [33.3406, 44.4009],
    'Ireland': [53.3331, -6.2489], 'Israel': [31.769, 35.2163], 'Italy': [41.8947, 12.4811],
    'Jamaica': [17.997, -76.7936], 'Japan': [35.6895, 139.6917], 'Jordan': [31.9552, 35.945],
    'Kazakhstan': [51.1801, 71.446], 'Kenya': [-1.2833, 36.8167], 'Kiribati': [1.3275, 172.9772],
    'Kuwait': [29.3697, 47.9783], 'Kyrgyzstan': [42.8746, 74.5698], 'Laos': [17.9749, 102.6308],
    'Latvia': [56.9496, 24.1052], 'Lebanon': [33.8886, 35.4955], 'Lesotho': [-29.3100, 27.4800],
    'Liberia': [6.3005, -10.7969], 'Libya': [32.8853, 13.1802], 'Liechtenstein': [47.1410, 9.5215],
    'Lithuania': [54.6892, 25.2798], 'Luxembourg': [49.6116, 6.1319], 'Madagascar': [-18.9137, 47.5361],
    'Malawi': [-13.9626, 33.7741], 'Malaysia': [3.1412, 101.6865], 'Maldives': [4.1748, 73.5089],
    'Mali': [12.65, -8.0], 'Malta': [35.8989, 14.5146], 'Mauritius': [-20.1619, 57.4989],
    'Mexico': [19.4273, -99.1419], 'Monaco': [43.7333, 7.4167], 'Mongolia': [47.9077, 106.8832],
    'Montenegro': [42.4304, 19.2594], 'Montserrat': [16.7918, -62.2106], 'Morocco': [34.0133, -6.8326],
    'Mozambique': [-25.9653, 32.5892], 'Myanmar': [19.745, 96.1297], 'Namibia': [-22.5609, 17.0832],
    'Nepal': [27.7017, 85.3206], 'Netherlands': [52.374, 4.8897], 'New Zealand': [-41.2866, 174.7756],
    'Nicaragua': [12.1364, -86.2514], 'Niger': [13.5116, 2.1254], 'Nigeria': [9.0574, 7.4898],
    'Norway': [59.9127, 10.7461], 'Oman': [23.6139, 58.5922], 'Pakistan': [33.7035, 73.0594],
    'Palau': [7.3400, 134.4757], 'Panama': [8.9958, -79.5196], 'Papua New Guinea': [-9.4438, 147.1803],
    'Paraguay': [-25.3007, -57.6359], 'Peru': [-12.0432, -77.0282], 'Philippines': [14.6042, 120.9822],
    'Poland': [52.2298, 21.0118], 'Portugal': [38.7169, -9.1399], 'Puerto Rico': [18.4663, -66.1057],
    'Qatar': [25.2747, 51.5245], 'Romania': [44.4328, 26.1043], 'Rwanda': [-1.9441, 30.0619],
    'Samoa': [-13.8333, -171.7667], 'San Marino': [43.9356, 12.4474], 'Saudi Arabia': [24.6905, 46.7096],
    'Senegal': [14.7333, -17.4583], 'Serbia': [44.8176, 20.4633], 'Seychelles': [-4.6191, 55.4513],
    'Sierra Leone': [8.4840, -13.2340], 'Singapore': [1.2897, 103.8501], 'Slovakia': [48.1482, 17.1067],
    'Slovenia': [46.0569, 14.5058], 'Solomon Islands': [-9.4333, 159.9500], 'Somalia': [2.0416, 45.3435],
    'South Africa': [-25.7461, 28.1881], 'South Korea': [37.5665, 126.9780], 'South Sudan': [4.8594, 31.5713],
    'Spain': [40.4165, -3.7026], 'Sri Lanka': [6.9319, 79.8478], 'Sudan': [15.5518, 32.5324],
    'Suriname': [5.8520, -55.2038], 'Sweden': [59.3326, 18.0649], 'Switzerland': [46.9481, 7.4474],
    'Syria': [33.5138, 36.2765], 'Taiwan': [25.0330, 121.5654], 'Tajikistan': [38.5598, 68.7870],
    'Tanzania': [-6.8000, 39.2833], 'Thailand': [13.722, 100.5252], 'Togo': [6.1375, 1.2123],
    'Trinidad and Tobago': [10.6500, -61.5167], 'Tunisia': [36.819, 10.1658], 'Turkey': [39.9199, 32.8543],
    'Turkmenistan': [37.95, 58.3833], 'Tuvalu': [-8.5244, 179.1942], 'Uganda': [0.3163, 32.5822],
    'Ukraine': [50.4454, 30.5186], 'United Arab Emirates': [24.4667, 54.3667], 'United Kingdom': [51.5085, -0.1257],
    'United States': [38.8951, -77.0369], 'Uruguay': [-34.8335, -56.1674], 'Uzbekistan': [41.2647, 69.2163],
    'Vanuatu': [-17.7333, 168.3167], 'Vatican City': [41.9029, 12.4534], 'Venezuela': [10.4880, -66.8792],
    'Vietnam': [21.0285, 105.8542], 'Yemen': [15.3531, 44.2078], 'Zambia': [-15.4134, 28.2771],
    'Zimbabwe': [-17.8294, 31.0539]
}

export default class RuleLocation extends Rule {
    constructor() {
        super("Your password must contain the name of the country at this latitude and longitude.");
        this.keys = Object.keys(locations);
        this.locationName = this.keys[Math.floor(Math.random()*this.keys.length)];
        console.log("Country:", this.locationName);
        this.createRenderItem();
    }

    createRenderItem() {
        this.renderItem = ({regenerateRule, correct, num}) => (
            <Location
                locationName={this.locationName}
                regenerate={()=>regenerateRule(num)}
                correct={correct}
            />
        );
    }

    regenerate() {
        this.locationName = this.keys[Math.floor(Math.random()*this.keys.length)];
        console.log("Country:", this.locationName);

	this.createRenderItem();
    }

    check(txt) {
        let r = RegExp(`(?:${this.locationName})`, "i");
        return r.test(txt);
    }
}

function Location({locationName, regenerate, correct}) {
    const latitude = locations[locationName][0];
    const longitude = locations[locationName][1];
    const [reloadsLeft, setReloadsLeft] = useState(3);

    return (
        <div className={styles.location_center_wrapper}>
            <div className={styles.location_inline}>
                <div className={styles.location}>
                    {latitude}, {longitude}
                </div>
                <ReloadButton
                    onClick={()=>{
                        if(reloadsLeft > 0) {
                            regenerate()
			    setReloadsLeft(reloadsLeft - 1);
                        }
                    }} 
                    hidden={correct}
		    reloadsLeft={reloadsLeft}
		    showLastReload={true}
                />
            </div>
        </div>
    )
}
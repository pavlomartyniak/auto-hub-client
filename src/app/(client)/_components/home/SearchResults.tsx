import { Box, Divider, Typography } from "@mui/material";
import STOCard from "@/components/shared/STOCard";
import { STO } from "@/types/sto";

const mockSTOs: STO[] = [
  {
    id: "1",
    name: "Oiler на Печерську",
    slug: "oiler-pechersk",
    description: "Сучасне СТО в центрі Києва з повним спектром послуг.",
    address: {
      city: "Київ",
      street: "вул. Кіквідзе",
      house: "43",
    },
    phones: ["+380 44 123 45 67"],
    workingHours: {
      "Monday-Friday": "08:00 - 20:00",
      Saturday: "09:00 - 18:00",
    },
    services: [
      { id: "s1", name: "Заміна мастила", priceFrom: 450, durationMinutes: 30 },
      {
        id: "s2",
        name: "Діагностика ходової",
        priceFrom: 600,
        durationMinutes: 45,
      },
    ],
    brands: ["Toyota", "Lexus", "Nissan", "Honda"],
    photos: [
      {
        id: "p1",
        url: "https://oiler.pro/media/wysiwyg/JPI-N--14.jpg",
        alt: "Oiler Фасад",
        isMain: true,
      },
    ],
    reviews: [],
    averageRating: 4.8,
    reviewCount: 156,
    isVerified: true,
    isPartner: true,
    availableSlots: ["Сьогодні, 13:00", "19 бер. 11:00", "20 бер. 15:00"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Bosch Service Захід",
    slug: "bosch-zakhid",
    description: "Авторизований сервісний центр Bosch.",
    address: {
      city: "Львів",
      street: "вул. Кульпарківська",
      house: "226",
    },
    phones: ["+380 32 987 65 43"],
    workingHours: { "Monday-Friday": "09:00 - 18:00" },
    services: [
      {
        id: "s3",
        name: "Ремонт двигуна",
        priceFrom: 5000,
        durationMinutes: 240,
      },
    ],
    brands: ["Volkswagen", "Skoda", "Audi"],
    photos: [
      {
        id: "p2",
        url: "https://www.boschcarservice.com/ua/media/images/ua/about_us/12_additional_content_about_guarantee_master_en/guarantee_4_image_640w_360h.jpg",
        alt: "Bosch Сервіс",
        isMain: true,
      },
    ],
    reviews: [],
    averageRating: 4.5,
    reviewCount: 89,
    isVerified: true,
    isPartner: false,
    availableSlots: [
      "Завтра, 09:00",
      "Завтра, 14:00",
      "19 бер. 12:00",
      "20 бер. 09:00",
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Кузовна Майстерня VIP",
    slug: "kuzov-vip",
    description: "Професійний кузовний ремонт та фарбування.",
    address: {
      city: "Одеса",
      street: "вул. Балківська",
      house: "16",
    },
    phones: ["+380 48 777 66 55"],
    workingHours: { "Monday-Friday": "08:30 - 19:00" },
    services: [
      {
        id: "s4",
        name: "Полірування кузова",
        priceFrom: 3000,
        durationMinutes: 180,
      },
    ],
    brands: ["BMW", "Mercedes-Benz"],
    photos: [
      {
        id: "p3",
        url: "https://blcar.services/img/services/kuzrem.jpg",
        alt: "Кузовний цех",
        isMain: true,
      },
    ],
    reviews: [],
    averageRating: 4.2,
    reviewCount: 34,
    isVerified: false,
    isPartner: false,
    availableSlots: ["Сьогодні, 16:00", "21 бер. 10:00"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Гараж 77",
    slug: "garage-77",
    description: "Швидкий та надійний ремонт авто.",
    address: {
      city: "Київ",
      street: "вул. Нижньоюрківська",
      house: "2",
    },
    phones: ["+380 50 111 22 33"],
    workingHours: { "Monday-Saturday": "09:00 - 19:00" },
    services: [
      {
        id: "s5",
        name: "Заміна гальмівних колодок",
        priceFrom: 800,
        durationMinutes: 60,
      },
    ],
    brands: [],
    photos: [
      {
        id: "p4",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWin9POdixDAvrI3qX4_6OnzGzT0jb3ifl9w&s",
        alt: "Garage 77",
        isMain: true,
      },
    ],
    reviews: [],
    averageRating: 4.6,
    reviewCount: 201,
    isVerified: true,
    isPartner: true,
    availableSlots: ["Сьогодні, 14:30", "Завтра, 11:00", "19 бер. 15:00"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Сфера Авто",
    slug: "sfera-avto",
    description: "Комп'ютерна діагностика та автоелектрика.",
    address: {
      city: "Дніпро",
      street: "вул. Робоча",
      house: "82",
    },
    phones: ["+380 67 222 33 44"],
    workingHours: { "Monday-Friday": "10:00 - 18:00" },
    services: [
      {
        id: "s6",
        name: "Комп'ютерна діагностика",
        priceFrom: 500,
        durationMinutes: 30,
      },
    ],
    brands: ["Renault", "Peugeot", "Citroen"],
    photos: [
      {
        id: "p5",
        url: "https://avatars.mds.yandex.net/get-altay/200322/2a0000015b17363e4e4c2bf25152a35c5922/L_height",
        alt: "Сфера Авто",
        isMain: true,
      },
    ],
    reviews: [],
    averageRating: 4.9,
    reviewCount: 412,
    isVerified: true,
    isPartner: true,
    availableSlots: [
      "Завтра, 15:00",
      "20 бер. 10:00",
      "20 бер. 11:30",
      "21 бер. 14:00",
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "6",
    name: "Тру Камера",
    slug: "true-camera",
    description: "Професійний шиномонтаж.",
    address: {
      city: "Львів",
      street: "вул. Зелена",
      house: "105",
    },
    phones: ["+380 93 444 55 66"],
    workingHours: { Everyday: "00:00 - 24:00" },
    services: [
      {
        id: "s7",
        name: "Балансування коліс",
        priceFrom: 200,
        durationMinutes: 20,
      },
    ],
    brands: [],
    photos: [
      {
        id: "p6",
        url: "https://premium-avto.com/wp-content/uploads/2025/02/mechanic-checking-car.jpg",
        alt: "Тру Камера",
        isMain: true,
      },
    ],
    reviews: [],
    averageRating: 4.3,
    reviewCount: 52,
    isVerified: true,
    isPartner: false,
    availableSlots: ["Сьогодні, 17:00", "Сьогодні, 18:00"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "7",
    name: "Шиномонтаж Маркет",
    slug: "shinomontazh-market",
    description: "Ваш надійний партнер на дорозі.",
    address: {
      city: "Харків",
      street: "проспект Науки",
      house: "39",
    },
    phones: ["+380 50 888 99 00"],
    workingHours: { "Monday-Sunday": "08:00 - 22:00" },
    services: [
      {
        id: "s8",
        name: "Сезонна заміна гуми",
        priceFrom: 800,
        durationMinutes: 40,
      },
    ],
    brands: [],
    photos: [
      {
        id: "p7",
        url: "https://top-sto.com.ua/storage/autoservices/ps-remzona.jpg",
        alt: "Шиномонтаж Маркет",
        isMain: true,
      },
    ],
    reviews: [],
    averageRating: 4.7,
    reviewCount: 819,
    isVerified: true,
    isPartner: true,
    availableSlots: [
      "Сьогодні, 10:00",
      "Завтра, 14:00",
      "19 бер. 09:00",
      "20 бер. 17:00",
      "21 бер. 12:00",
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "8",
    name: "СТО Дарниця",
    slug: "sto-darnytsia",
    description: "Ремонт ходової та двигуна. Гарантія якості.",
    address: {
      city: "Київ",
      street: "вул. Празька",
      house: "24",
    },
    phones: ["+380 44 222 11 00"],
    workingHours: { "Monday-Friday": "09:00 - 18:00" },
    services: [
      {
        id: "s9",
        name: "Заміна ременя ГРМ",
        priceFrom: 2500,
        durationMinutes: 120,
      },
    ],
    brands: ["Hyundai", "Kia", "Mazda"],
    photos: [
      {
        id: "p8",
        url: "https://premium-avto.com/wp-content/uploads/2025/02/car-cleaning-and-detailing-concept-dry-wash-2022-11-09-03-10-49-utc.jpg",
        alt: "СТО Дарниця",
        isMain: true,
      },
    ],
    reviews: [],
    averageRating: 4.1,
    reviewCount: 22,
    isVerified: false,
    isPartner: false,
    availableSlots: ["20 бер. 10:00", "21 бер. 15:00"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "9",
    name: "АвтоЕксперт+",
    slug: "auto-expert-plus",
    description: "Передпродажна підготовка автомобілів.",
    address: {
      city: "Львів",
      street: "вул. Стрийська",
      house: "108",
    },
    phones: ["+380 97 123 98 76"],
    workingHours: { "Monday-Saturday": "10:00 - 20:00" },
    services: [
      {
        id: "s10",
        name: "Хімчистка салону",
        priceFrom: 1200,
        durationMinutes: 180,
      },
    ],
    brands: [],
    photos: [
      {
        id: "p9",
        url: "https://premium-avto.com/wp-content/uploads/2025/02/professional-mechanics-repairing-car-without-wheel-2022-12-16-21-13-54-utc.jpg",
        alt: "АвтоЕксперт+",
        isMain: true,
      },
    ],
    reviews: [],
    averageRating: 4.8,
    reviewCount: 63,
    isVerified: true,
    isPartner: true,
    availableSlots: [
      "Сьогодні, 19:00",
      "Завтра, 10:00",
      "Завтра, 12:30",
      "19 бер. 16:00",
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const totalResults = mockSTOs.length;

const SearchResults = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        width: "100%",
      }}
    >
      <Typography variant="body2">
        Found {totalResults} results near{" "}
        <Box component="span" fontWeight="600" color="common.black">
          Львів, Україна
        </Box>
      </Typography>

      <Divider />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "1fr 1fr 1fr",
          },
          gap: 3,
        }}
      >
        {mockSTOs.map((sto) => (
          <STOCard key={sto.id} sto={sto} />
        ))}
      </Box>
    </Box>
  );
};

export default SearchResults;

export const QUIZ_STAGES = [
  // 1. SORU
  {
    type: "question",
    stepNumber: 1,
    title: "SORU 1",
    question: "En sevdiğin arkadaşın kim?",
    options: [
      { key: "A", text: "mezitlinin abisi ati" },
      { key: "B", text: "çarşınındızosu berat" },
      { key: "C", text: "yenimahalle bebesi ahmet" }
    ],
    correctKey: "A"
  },

  // 2. SORU
  {
    type: "question",
    stepNumber: 2,
    title: "SORU 2",
    question: "Peki gerçekten öyle mi metemtemet?",
    options: [
      { key: "A", text: "evet" },
      { key: "B", text: "hayır" },
      { key: "C", text: "evet gerçekten öyle" }
    ],
    correctKey: "C"
  },

  // 3. AŞAMA | ÖZEL GEÇİŞ
  {
    type: "custom_transition",
    stepNumber: 3,
    title: "ÖZEL GEÇİŞ",
    message: "Laflar aramızda kalsın ama tamam mı?",
    buttonText: "Tamam"
  },

  // 4. SORU
  {
    type: "question",
    stepNumber: 4,
    title: "SORU 4",
    introText: "Çok içime sinmedi ya kanıtlamanı istiyorum o yüzden",
    question: "ati sence neden sana senin güvenmen için \"mete kızlara bir vuruyor karşılığını da fena alıyor\" ss'ini aldırdı sana",
    options: [
      { key: "A", text: "çünkü ati vurmasa da havalı gözükmek istiyordu" },
      { key: "B", text: "çünkü metenin içine sinmediği için ss aldırdı" },
      { key: "C", text: "çünkü keyfiyetten istedi" }
    ],
    correctKey: "B"
  },

  // 5. SORU
  {
    type: "question",
    stepNumber: 5,
    title: "SORU 5",
    question: "Kim kızlara vurarak fena derecede karşılığını alır?",
    options: [
      { key: "A", text: "mahir" },
      { key: "B", text: "mete" },
      { key: "C", text: "ati" }
    ],
    correctKey: "A"
  },

  // 6. SORU
  {
    type: "question",
    stepNumber: 6,
    title: "SORU 6",
    question: "Ortak olarak Sago'nun en sevdiğimiz şarkısı hangisi?",
    options: [
      { key: "A", text: "kalbim krizin bekçisi olmuş" },
      { key: "B", text: "bu böyledir" },
      { key: "C", text: "kargaların kargaşası" }
    ],
    correctKey: "A"
  },

  // 7. SORU
  {
    type: "question",
    stepNumber: 7,
    title: "SORU 7",
    question: "Bir kodadı seçecek olsan hangisini seçersin?",
    options: [
      { key: "A", text: "simit" },
      { key: "B", text: "ayran" },
      { key: "C", text: "dişfırçası" }
    ],
    correctKey: "B",
    specialMessage: "😉 Aferin, hatırlıyormuşsun."
  },

  // 8. AŞAMA | SON SORU
  {
    type: "question",
    stepNumber: 8,
    title: "SON SORU",
    question: "Tamam buraya kadar sorular kolay olabilir bunu da bilirsen arkadaşlığımızda pek bişe unutmamışsın şimdi söyle bakalım biz hangi kızın fotosunu isteyip twerk attırmak istedik?",
    subQuestion: "(sorular bıktırmış olabilir artık kutlama aşamasına geçelim hemen cevapla hadi)",
    options: [
      { key: "A", text: "zümra" },
      { key: "B", text: "hira" },
      { key: "C", text: "azra" }
    ],
    correctKey: "C"
  }
];

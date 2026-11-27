const stepsData = [
  {
    step: "STEP 01",
    title: "사진 상담 및 견적",
    desc: "카카오톡이나 문자로 가구·매트리스 사진을 보내주시면 소재와 오염 상태를 정확히 확인하여 투명한 견적을 안내해 드립니다.",
    equip: "상담 채널: 사진 확인 후 안내",
    imgSrc: "assets/step-01.png"
  },
  {
    step: "STEP 02",
    title: "사전 점검 및 보양 작업",
    desc: "원단 및 가죽 상태를 꼼꼼히 체크한 뒤, 주변 공간과 바닥 오염을 방지하기 위한 보양 작업을 철저히 진행합니다.",
    equip: "작업 기준: 원단 진단 및 바닥 보양",
    imgSrc: "assets/step-02.png"
  },
  {
    step: "STEP 03",
    title: "델핀 건식 딥클렌징 (고속 진동 태핑)",
    desc: "분당 수만 회의 강력한 고속 진동(태핑) 시스템으로 매트리스와 소파 깊은 층에 박혀 있는 미세먼지, 각질, 집진드기 및 틈새 이물질을 완벽하게 털어내며 1차로 흡입합니다.",
    equip: "사용 장비: 델핀 드라이 건식 진공청소기",
    imgSrc: "assets/step-03.png"
  },
  {
    step: "STEP 04",
    title: "카처 SC3 고온 스팀 살균",
    desc: "고온·고압 스팀을 구석구석 분사하여 섬유 속 유해 세균을 99.9% 열살균하고, 찌든 때와 불쾌한 냄새 인자를 부드럽게 이완시킵니다.",
    equip: "사용 장비: 카처 SC3 고온 스팀기",
    imgSrc: "assets/step-04.png"
  },
  {
    step: "STEP 05",
    title: "맞춤형 얼룩 전처리 (키즈 & 패밀리 안심 케어)",
    desc: "면역력이 민감한 아이와 반려견이 안심하고 사용할 수 있도록, 인체와 반려동물에게 유해한 독한 화학 성분은 배제하고 안전한 성분만을 선별합니다. 커피, 음식물, 소변 등 오염 성분과 원단 특성에 맞춘 전문 전처리 용액으로 원단 손상 없이 안전하게 얼룩을 분해합니다.",
    equip: "케어 기준: 키즈 & 패밀리 안심 전처리",
    imgSrc: "assets/step-05.png"
  },
  {
    step: "STEP 06",
    title: "카처 습식 익스트렉션 세척",
    desc: "묵은 때를 불려낸 뒤, 강력한 고압 분사와 즉시 흡입 시스템으로 오염수와 구정물을 남김없이 뽑아냅니다.",
    equip: "사용 장비: 카처 Puzzi 10/1 습식 청소기",
    imgSrc: "assets/step-06.png"
  },
  {
    step: "STEP 07",
    title: "툴앤툴 피톤치드 연무 케어",
    desc: "미세 입자 연무 케어를 통해 실내 공간과 패브릭 전체에 강력한 항균 및 탈취 효과를 고르게 입혀줍니다.",
    equip: "사용 장비: 툴앤툴 피톤치드 연무기",
    imgSrc: "assets/step-07.png"
  },
  {
    step: "STEP 08",
    title: "아로마케어(우드호텔향)",
    desc: "고급스러운 '우드호텔향'으로 산뜻하고 쾌적한 공기 케어를 마무리하고, 최종 결과를 고객님과 함께 확인한 후 서비스를 마칩니다.",
    equip: "사용 재료: 우드호텔향 아로마오일",
    imgSrc: "assets/step-08.png"
  }
];

const faqData = [
  {
    q: "청소 소요 시간은 얼마나 걸리나요?",
    a: "품목 수와 오염 정도에 따라 다르지만 보통 소파 또는 매트리스 1점 기준 약 1시간~1시간 30분 내외가 소요됩니다."
  },
  {
    q: "습식 세척 후 건조 시간은 얼마나 걸리나요?",
    a: "오염수를 즉시 흡입하는 방식을 사용하며, 실내 환기나 에어컨·제습기 활용 시 보통 수 시간 내로 쾌적하게 사용하실 수 있습니다."
  },
  {
    q: "사진 상담은 어떻게 신청하나요?",
    a: "전체 모습과 얼룩·오염 부위 사진을 2~4장 정도 찍어 문의해 주시면 소재와 상태를 확인 후 안내해 드립니다."
  }
];

const processGrid = document.getElementById("processGrid");
if (processGrid) {
  processGrid.innerHTML = stepsData
    .map(
      (item) => `
      <article class="card">
        <div class="step-thumb">
          ${
            item.imgSrc
              ? `<img src="${item.imgSrc}" alt="${item.step} ${item.title}" loading="lazy" onerror="this.remove();" />`
              : ""
          }
        </div>
        <span class="step-code">${item.step}</span>
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
        <div class="step-equip">${item.equip}</div>
      </article>
    `
    )
    .join("");
}

const faqList = document.getElementById("faqList");
if (faqList) {
  faqList.innerHTML = faqData
    .map(
      (item, idx) => `
      <div class="faq-item ${idx === 0 ? "open" : ""}">
        <button type="button" class="faq-question">
          <span>Q. ${item.q}</span>
          <span>${idx === 0 ? "−" : "+"}</span>
        </button>
        <div class="faq-answer">${item.a}</div>
      </div>
    `
    )
    .join("");

  faqList.querySelectorAll(".faq-question").forEach((btn) => {
    btn.addEventListener("click", () => {
      const parent = btn.parentElement;
      const isOpen = parent.classList.toggle("open");
      btn.lastElementChild.textContent = isOpen ? "−" : "+";
    });
  });
}

const quoteModal = document.getElementById("quoteModal");
const openQuoteModalBtn = document.getElementById("openQuoteModal");
const heroQuoteBtn = document.getElementById("heroQuoteBtn");
const closeQuoteModalBtn = document.getElementById("closeQuoteModal");
const quotePlanInput = document.getElementById("quotePlanInput");
const quoteForm = document.getElementById("quoteForm");

function openModal(planText = "") {
  if (planText && quotePlanInput) {
    quotePlanInput.value = planText;
  }
  quoteModal.classList.add("open");
  quoteModal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  quoteModal.classList.remove("open");
  quoteModal.setAttribute("aria-hidden", "true");
}

openQuoteModalBtn?.addEventListener("click", () => openModal());
heroQuoteBtn?.addEventListener("click", () => openModal());
closeQuoteModalBtn?.addEventListener("click", closeModal);

document.querySelectorAll(".select-plan-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    openModal(btn.dataset.plan || "");
  });
});

quoteModal?.addEventListener("click", (e) => {
  if (e.target === quoteModal) closeModal();
});

quoteForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("견적 문의 내용이 접수되었습니다. 확인 후 빠르게 안내해 드리겠습니다.");
  quoteForm.reset();
  closeModal();
});

"use client";

import { useState } from "react";

import { PvReveal } from "@/components/anasayfa/pv-reveal";
import { faqs } from "@/data/home";

/** 7. durak — sık sorulan sorular.

    Referanstaki FAQ bölümünün yapısı: koyu zemin, ortalanmış kicker ve
    serif başlık, altında dar ve ortalanmış akordeon listesi. Her satır
    soru metni, sağında dairesel bir chevron düğmesi ve altında ince bir
    ayırıcı çizgi taşır.

    Açılma/kapanma grid-template-rows 0fr → 1fr geçişiyle yapılır: yanıt
    kutusu ölçülmeden, JavaScript yüksekliği hesaplamadan akıcı biçimde
    açılır. Bu, yükseklik animasyonu gerektiren tek yerdir; sayfadaki
    diğer bütün hareketler transform ve opacity üzerindedir.

    Erişilebilirlik: her satır gerçek bir <button> ile açılır, aria-expanded
    ve aria-controls taşır, yanıt bölgesi başlığa bağlanır. Klavye
    desteği tarayıcının kendi buton davranışından gelir. Kapalı yanıt
    visibility: hidden ile odak sırasından da çıkarılır.

    prefers-reduced-motion açıkken geçiş anında olur, içerik gizli
    kalmaz. */

export function FaqList() {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <section className="pv pv-faq" id="sss" aria-labelledby="pv-faq-title">
      <div className="pv-shell">
        <div className="pv-head pv-head--center">
          <PvReveal className="pv-kicker" distance="text">
            <span className="pv-kicker__dot" aria-hidden="true" />
            Sık sorulan sorular
          </PvReveal>

          <PvReveal as="h2" className="pv-h2" distance="text" order={1}>
            <span id="pv-faq-title">Merak edilenler</span>
          </PvReveal>
        </div>

        <PvReveal className="pv-faq__list">
          {faqs.map((faq) => {
            const open = openId === faq.id;

            return (
              <div className="pv-faq__row" key={faq.id} data-open={open || undefined}>
                <h3 className="pv-faq__heading">
                  <button
                    className="pv-faq__trigger"
                    type="button"
                    aria-expanded={open}
                    aria-controls={`pv-faq-panel-${faq.id}`}
                    id={`pv-faq-trigger-${faq.id}`}
                    onClick={() => setOpenId(open ? null : faq.id)}
                  >
                    <span className="pv-faq__question">{faq.question}</span>
                    <span className="pv-faq__chevron" aria-hidden="true">
                      <svg viewBox="0 0 16 16">
                        <path
                          d="m6.2 3.6 4.4 4.4-4.4 4.4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>
                </h3>

                <div
                  className="pv-faq__panel"
                  id={`pv-faq-panel-${faq.id}`}
                  role="region"
                  aria-labelledby={`pv-faq-trigger-${faq.id}`}
                >
                  <div className="pv-faq__panelInner">
                    <p className="pv-faq__answer">{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </PvReveal>
      </div>
    </section>
  );
}

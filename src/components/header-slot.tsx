/** Sabit (fixed) kapsül menünün akışta bıraktığı yer tutucu.

    Kapsül `position: fixed` olduğu için akıştan çıkar; bu boş kutu onun
    eskiden kapladığı satırı korur. Yükseklikler header'ın önceki
    min-height değerleriyle birebir aynıdır (76 / 70 / 62 px), böylece
    ana sayfa hero'sunun dikey kompozisyonu piksel piksel yerinde kalır. */
export function HeaderSlot() {
  return <div className="header-slot" aria-hidden="true" />;
}

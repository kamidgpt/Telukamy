// Formate un montant en centimes : 2500 -> "25,00 €"
// (fait à la main pour avoir exactement le même rendu côté serveur et navigateur)
export function prix(centimes: number) {
  const euros = Math.floor(Math.abs(centimes) / 100);
  const cts = String(Math.abs(centimes) % 100).padStart(2, "0");
  const milliers = String(euros).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${centimes < 0 ? "−" : ""}${milliers},${cts} €`;
}

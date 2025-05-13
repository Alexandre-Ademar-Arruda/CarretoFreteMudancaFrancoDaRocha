// Remover checkboxes salvos ao carregar a página e garantir que estejam desmarcados
window.addEventListener('DOMContentLoaded', () => {
  localStorage.removeItem('checkboxes'); // Impede que checkboxes marcados anteriormente sejam restaurados

  // Desmarca todos os checkboxes ao carregar a página
  document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
});

// Mostrar os cômodos e campos finais
document.getElementById('btnOrcamento').addEventListener('click', () => {
  document.getElementById('comodosContainer').classList.remove('hidden');
  document.getElementById('dadosFinais').classList.remove('hidden');
  document.getElementById('btnOrcamento').classList.add('hidden');
});

// Toggle dos cômodos
document.querySelectorAll('.comodoToggle').forEach(toggle => {
  toggle.addEventListener('click', () => {
    const id = toggle.getAttribute('data-comodo');
    const form = document.getElementById(id);
    form.classList.toggle('hidden');
  });
});

// Mapeamento de emojis para móveis
const itemEmojis = {
  geladeira: "🧊",
  fogao: "🍳",
  maquina: "🧼",
  microondas: "🍔",
  lavaLoucas: "🍽️",
  forno: "🔥",
  colchao: "🛏️",
  box: "🛏️",
  guardaRoupa: "👚",
  sofa: "🛋️",
  rack: "📺",
  estante: "🖼️"
};

// Enviar orçamento no WhatsApp
document.getElementById('btnEnviarZap').addEventListener('click', () => {
  const nome = document.getElementById('nome').value.trim();
  const carregar = document.getElementById('carregar').value.trim();
  const descarregar = document.getElementById('descarregar').value.trim();
  const data = document.getElementById('data').value;

  const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  const itens = Array.from(checkboxes).map(cb => {
    const emoji = itemEmojis[cb.id] || "📦"; // Adiciona emoji correto ou 📦 se não houver um definido
    return `✅ ${emoji} ${cb.value}`;
  });

  // Validação
  if (!nome || !carregar || !descarregar || !data || itens.length === 0) {
    alert('Por favor, preencha todos os campos e selecione ao menos um item.');
    return;
  }

  const mensagem = `🚚 ORÇAMENTO

👤 Nome: ${nome}
📍 Endereço de carregar: ${carregar}
📍 Endereço de descarregar: ${descarregar}
📅 Data do carreto: ${data}

📦 Itens selecionados:
${itens.join('\n')}`;

  const zap = `https://wa.me/5511995424085?text=${encodeURIComponent(mensagem)}`;
  window.open(zap, '_blank');
});
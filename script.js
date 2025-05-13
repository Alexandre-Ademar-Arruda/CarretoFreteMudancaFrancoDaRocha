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

// Restaurar dados do localStorage ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('carregar').value = localStorage.getItem('carregar') || '';
  document.getElementById('descarregar').value = localStorage.getItem('descarregar') || '';
  document.getElementById('data').value = localStorage.getItem('data') || '';

  const storedCheckboxes = JSON.parse(localStorage.getItem('checkboxes')) || [];
  storedCheckboxes.forEach(id => {
    const checkbox = document.getElementById(id);
    if (checkbox) checkbox.checked = true;
  });
});

// Armazenar dados em tempo real
['carregar', 'descarregar', 'data'].forEach(id => {
  document.getElementById(id).addEventListener('input', (e) => {
    localStorage.setItem(id, e.target.value);
  });
});

// Armazenar checkboxes
document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
  cb.addEventListener('change', () => {
    const checked = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(c => c.id);
    localStorage.setItem('checkboxes', JSON.stringify(checked));
  });
});

// Enviar orçamento no WhatsApp
document.getElementById('btnEnviarZap').addEventListener('click', () => {
  const carregar = document.getElementById('carregar').value.trim();
  const descarregar = document.getElementById('descarregar').value.trim();
  const data = document.getElementById('data').value;

  const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  const itens = Array.from(checkboxes).map(cb => `✅ ${cb.value}`);

  // Validação dos campos
  if (!carregar || !descarregar || !data || itens.length === 0) {
    alert('Por favor, preencha todos os campos e selecione ao menos um item.');
    return;
  }

  const mensagem = `🚚 ORÇAMENTO

📍 Endereço de carregar: ${carregar}
📍 Endereço de descarregar: ${descarregar}
📅 Data do carreto: ${data}

📦 Itens selecionados:
${itens.join('\n')}`;

  const zap = `https://wa.me/5511995424085?text=${encodeURIComponent(mensagem)}`;
  window.open(zap, '_blank');
});

const e=`<section class="page">
  <div class="page-header">
    <h1>Calendar</h1>
    <p class="page-desc">O componente de Calendário permite selecionar um valor de data de um conjunto predeterminado.</p>
  </div>

  <div class="demo-section">
    <h2 class="demo-title">Componente / Calendar</h2>
    <div class="demo-calendar-row">
      <div id="calendar-default"></div>
      <div id="calendar-selected"></div>
    </div>
  </div>

  <div class="demo-section">
    <h2 class="demo-title">Master assets</h2>
    <div class="demo-master-box">
      <div class="demo-calendar-inline">
        <div id="calendar-master"></div>
        <div class="demo-time-picker">
          <span class="demo-time-label">Horário</span>
          <div class="calendar-time" id="time-picker">
            <button class="calendar-time-item">7:00</button>
            <button class="calendar-time-item">7:30</button>
            <button class="calendar-time-item">8:00</button>
            <button class="calendar-time-item">8:30</button>
            <button class="calendar-time-item is-selected">9:00</button>
            <button class="calendar-time-item">9:30</button>
            <button class="calendar-time-item">10:00</button>
            <button class="calendar-time-item">10:30</button>
            <button class="calendar-time-item">11:00</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="demo-section">
    <h2 class="demo-title">Month & Year Picker</h2>
    <div class="demo-calendar-row">
      <div id="calendar-months"></div>
      <div id="calendar-years"></div>
    </div>
  </div>

  <!-- Exemplo Light/Dark -->
  <div class="demo-section">
    <h2 class="demo-title">Exemplo</h2>
    <div class="demo-row demo-row--example">
      <div class="demo-col">
        <span class="demo-label">Light Mode</span>
        <div class="demo-example-box">
          <div id="calendar-light"></div>
        </div>
      </div>

      <div class="demo-col">
        <span class="demo-label demo-label--dark">Dark Mode</span>
        <div class="demo-example-box demo-example-box--dark">
          <div id="calendar-dark"></div>
        </div>
      </div>
    </div>
  </div>
</section>
`;export{e as default};

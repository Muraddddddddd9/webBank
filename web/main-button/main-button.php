
<div class="button_container">
    <span class="totalAllTime" id="totalAllTime">
        <span>Всего:</span>
        <span class="ZeroTotalAllTime">0</span>
    </span>
    <button type="button" class="deleteAll" onclick="openModal()">Удалить всё</button>
    <button type="button" class="buttonAdd" onclick="modalCreateBank()">Добавить</button>
    <input type="text" class="searchBank" id="searchInput" placeholder="Поиск банка" oninput="searchBanks()">
</div>

<div id="myModal" class="modal-deleteAll" style="display: none;">
    <div class="modal-deleteAll-content">
        <p>Вы точно хотите удалить все банки?</p>
        <button type="button" id="cancelButton" class="cancelButton" onclick="closeModal()">Отмена</button>
        <button type="button" id="deleteButton" class="deleteButton" onclick="deleteAllRows()">Удалить</button>
    </div>
</div>

<div class="list_selector">
    <div class="select_type form_list">
        <form>
            <label for="users">Order Lists by </label>
            <select name="users" onchange="testeLists()">
                <option value=""></option>
                <option value="1">Title</option>
                <option value="2">Creation Date</option>
                <option value="3">Reminder Date</option>
                <option value="4">Group</option>
            </select>
        </form>
    </div>

    <div class="select_order form_list" id="select_order">
        <form>
            <label for="users">Order </label>
            <select name="users" onchange="displayLists(value, this.value)">
                <option value=""></option>
            </select>
        </form>
    </div>
</div>

<div class="scrollable_div">
    <div class="display_lists_grid" id="display_lists_grid">
    </div>
</div>
<script src="js/manage_lists.js"></script>
<script>createAddList()</script>

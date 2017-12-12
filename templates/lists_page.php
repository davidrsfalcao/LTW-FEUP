<?php
    include_once('actions/generate_random_token.php');
    $token = generate_random_token();
?>

<div class="list_selector">
    <div class="select_type form_list">
        <form>
            <label for="orderBySelec">Show by</label>
            <select name="orderBySelec" id="orderBySelec" onchange="orderBy(this.value)">
                <option value="1">Title</option>
                <option value="2">Creation Date</option>
                <option value="3">Reminder Date</option>
                <option value="4">Conclusion</option>
                <option value="5">Search</option>
            </select>
        </form>
    </div>

    <div class="select_order form_list" id="select_order">
        <form>
            <label for="orderBySelec">Order </label>
            <select name="orderByASCDES" id="orderByASCDES" onchange="refreshGrid()">
                <option value="1">Ascendant</option>
                <option value="2">Descendant</option>
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
<script>setUser("<?=$_SESSION['username']?>")</script>
<script>getUserLists()</script>

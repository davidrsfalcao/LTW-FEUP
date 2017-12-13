<div class="list_selector">
    <div class="select_type form_list">
        <form>
            <label for="searchUser">Search: </label>
            <input type="text" name="searchUser" id="searchUser"  onkeyup="get_sugestions_from_db()"/>
            <button type="button" id="goSearchUser" id="goSearchUser" onclick="verifyExistsInput()">Go</button>
        </form>
    </div>

    <div class="select_order form_list" id="sugestionUser_div">
        <form>
            <label for="sugestionUser">Sugestions: </label>
            <input type="text" name="sugestionUser" id="sugestionUser"  readonly/>
        </form>
    </div>
</div>

<div class="scrollable_div">
    <div class="display_lists_grid" id="display_friends_grid">
    </div>
</div>

<script src="js/friends.js"></script>
<script>get_user_friends("<?=$_SESSION['username']?>")</script>

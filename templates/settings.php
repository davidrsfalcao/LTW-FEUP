<?php
$first_name = get_user_first_name($user);
$user = $_SESSION['username'];

?>

<div class="central_box">
 <div class="old_password" id="old_password">
   <form action="actions/verify_password.php" method="post" id="first_pass" class="profile_form">
		<label for="name_1" class="bold_text settings_label">Enter password </label>
		<input type="password" name="password_antiga" value="" id="pwd"  required/>
		<button class="form_button" id="form_button_old" type="button" onclick="verifyPassword('<?=$user?>')">Confirm</button>
		
    </form>
</div>

 <div class= "options" id="options" >
    <form action="actions/update_password.php" method="post" id="new_pass" class="profile_form">
		<label for="name_1" class="bold_text settings_label">New password </label>
        <input type="password" name="password_1" value="" id="password_1"  required/>
		<label for="name_1" class="bold_text setting_label">Confirm new password</label>
		<input type="password" name="password_2" value="" id="password_2"  required/>
		<button class="form_button" id="confirm_button" type="button" onclick="changePassword()">Change Password</button>
    </form>
	
	<form action="actions/delete_account.php" method="post" id="delete_account" class="profile_form">
	<h3>Delete Account </h3>
	<button class="form_button" id= "delete_button" type="button" onclick="delete_user()">Delete Account</button>
	</form>
	</div>
	
</div>

<script src="js/edit_profile.js"></script>
<script src="js/all_settings.js"></script>
				</div>
			</section>

		</main>
	</div>

	<div class="modal project-modal">
		<div class="content modal-content">

			<div class="inner"></div>
			<a href="#" class="close-modal"><i class="fas fa-times"></i></a>

		</div>
	</div>

	<div class="modal resume-modal <?php echo (isset($_GET['resume']) && $_GET['resume'] == '1' ? 'active' : ''); ?>">
		<div class="content modal-content">

			<div class="inner">
				<?php require_once('resume.php'); ?>
			</div>

			<a href="#" class="close-modal"><i class="fas fa-times"></i></a>

		</div>
	</div>

</body>
</html>
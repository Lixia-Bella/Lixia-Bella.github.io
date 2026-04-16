/**
 * Toast 提示（从原 utils 抽出，供 quiz 模块使用）
 */
export const showToast = (message) => {
	const existing = document.querySelector('.toast-message');
	if (existing) existing.remove();

	const toast = document.createElement('div');
	toast.className = 'toast-message';
	toast.textContent = message;
	document.body.appendChild(toast);

	requestAnimationFrame(() => {
		toast.classList.add('show');
	});

	setTimeout(() => {
		toast.classList.remove('show');
		setTimeout(() => {
			toast.remove();
		}, 300);
	}, 2500);
};

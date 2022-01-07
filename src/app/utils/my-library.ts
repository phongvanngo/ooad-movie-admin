
export function setCookie(name: string, value: any, days = 2): void {
	let expires = "";
	if (days) {
		const date = new Date();
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
		expires = "; expires=" + date.toUTCString();
	}
	document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

export function generateId(): string {
	return (
		Math.random().toString(36).substring(2, 15) +
		Math.random().toString(36).substring(2, 15)
	);
}

export function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

export function converDate(str: string) {
	try {
		const dates = str.split("-");
		return `${dates[2]}/${dates[1]}/${dates[0]}`;
	} catch (error) {
		const date = new Date(parseInt(str) * 1000);
		const day = "0" + date.getDate();
		const month = "0" + date.getMonth() + 1;
		const year = date.getUTCFullYear();

		const formattedTime = day.substr(-2) + "-" + month.substr(-2) + "-" + year;
		return formattedTime;
	}
}

export function formatDateTime(timestamp: number) {
	try {
		const date = new Date(timestamp * 1000);
		const day = "0" + date.getDate();
		const month = "0" + date.getMonth();
		const year = date.getFullYear();

		const formattedTime = day.substr(-2) + "-" + month.substr(-2) + ":" + year;
		return formattedTime;
	} catch (error) {
		console.log(error);
	}
}

export function removeAccents(str: string) {
	try {
		const AccentsMap = [
			"aàảãáạăằẳẵắặâầẩẫấậ",
			"AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
			"dđ",
			"DĐ",
			"eèẻẽéẹêềểễếệ",
			"EÈẺẼÉẸÊỀỂỄẾỆ",
			"iìỉĩíị",
			"IÌỈĨÍỊ",
			"oòỏõóọôồổỗốộơờởỡớợ",
			"OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
			"uùủũúụưừửữứự",
			"UÙỦŨÚỤƯỪỬỮỨỰ",
			"yỳỷỹýỵ",
			"YỲỶỸÝỴ",
		];
		for (let i = 0; i < AccentsMap.length; i++) {
			const re = new RegExp("[" + AccentsMap[i].substr(1) + "]", "g");
			const char = AccentsMap[i][0];
			str = str.replace(re, char);
		}
		return str;
	} catch (error) {
		return str;
	}

}

export function filterArrayBySearchTerm(myArray: any, searchTerm: string): any {
	if (!searchTerm?.length) return myArray;
	searchTerm = removeAccents(searchTerm).toUpperCase().trim();
	const res = [];

	for (let index = 0; index < myArray.length; index++) {
		const element = myArray[index];
		try {
			for (const key in element) {
				const value = removeAccents(element[key].toString().toUpperCase());
				if (value.includes(searchTerm)) {
					res.push(element);
					break;
				}
			}
		} catch (error) {
			console.log(error);

		}
	}
	return res;
}

export function convertDateTime(myDate: number): string {
	// date to dd/mm/yyyy
	const date = new Date(myDate);
	console.log(date);
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const year = date.getFullYear();
	const output = day + "/" + month + "/" + year;
	return output;
}
export function convertTimestampToFullDateTime(myDate: number): string {
	// date to dd/mm/yyyy
	const date = new Date(myDate);
	console.log(date);
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const year = date.getFullYear();
	const hh = date.getHours();
	const mm = date.getMinutes();
	const output = day + "/" + month + "/" + year + " " + hh + ":" + mm;
	return output;
}

export function convertDateTimeForPostData(date: any): string {
	const time = new Date(date);
	const yy = time.getFullYear();
	const mm = time.getMonth();
	const dd = time.getDate();
	return `${dd}/${mm}/${yy}`;


}

export function formatCurrency(v: string | number): string {
	let value = v.toString();
	value = parseInt(value.replace(/,/g, ""))
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VND";
	return value;
}
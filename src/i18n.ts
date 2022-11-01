import i18n from "i18next";
import { initReactI18next } from "react-i18next";
const resources = {
    en: {
        translation:{
            WelcomeTo: "Welcome to",
            EnterYourName: "Enter your name",
            GetStarted: "Get Started",
            Hello: "Hello",
            MyDay: "My Day",
            Important: "Important",
            Normal: "Normal",
            All: "All",
            Tasks: "Tasks",
            Completed: "Completed",
            Setting: "Setting",
            Language: "Language",
            ChangeLanguage: "Change Language",
            ClearData: "Clear Data",
            CreateTask: "Create Task",
            TaskTitle: "Task Title",
            Description: "Description",
            Choose_DateTimeStart: "Choose Date Time Start",
            Choose_DateTimeEnd: "Choose Date Time End",
            GetAlert: "Get alert for this task",
            EnterDescription: "Enter Description",
            Optional:"Optional",
            Done: "Done",
            Cancel: "Cancel",
            TaskLevel: "Task Level",
            Unimportant: "Unimportant",
            SelectDate: "Select Date",
            SelectTime: "Select Time",
            TaskTitlePlaceholder: "Enter Task Title",
            Start: "Start",
            End: "End",
            Close : "Close",
            To: "To",
            MessageNotify: "You have a task",
            In: "in",
            Minutes: "minutes",
            Now: "Now",
            Expired: "Expired",
            Delete: "Delete",
            // MessageNotify: (title: string, timer?: number)=>{
            //   return `You have a task ${title} ${timer ? `in ${timer} minutes` : "now"}`;
            // }
        }
    },
    vi: {
        translation:{
            WelcomeTo: "Chào mừng đến",
            EnterYourName: "Nhập tên của bạn",
            GetStarted: "Bắt đầu",
            Hello: "Xin chào",
            MyDay: "Hôm nay",
            Important: "Quan trọng",
            Normal: "Bình thường",
            All: "Tất cả",
            Tasks: "Công việc",
            Completed: "Hoàn thành",
            Setting: "Cài đặt",
            Language: "Ngôn ngữ",
            ChangeLanguage: "Thay đổi ngôn ngữ",
            ClearData: "Xóa dữ liệu",
            CreateTask: "Tạo công việc",
            TaskTitle: "Tiêu đề công việc",
            Description: "Mô tả",
            Choose_DateTimeStart: "Chọn thời gian bắt đầu",
            Choose_DateTimeEnd: "Chọn thời gian kết thúc",
            GetAlert: "Nhận thông báo cho công việc này",
            EnterDescription: "Nhập mô tả",
            Optional:"Tùy chọn",
            Done: "Xong",
            Cancel: "Hủy",
            TaskLevel: "Mức độ công việc",
            Unimportant: "Không quan trọng",
            SelectDate: "Chọn ngày",
            SelectTime: "Chọn thời gian",
            TaskTitlePlaceholder: "Nhập tiêu đề công việc",
            Start: "Bắt đầu",
            End: "Kết thúc",
            Close : "Đóng",
            To: "Đến",
            MessageNotify: "Bạn có một công việc",
            In: "trong",
            Minutes: "phút",
            Now: "bây giờ",
            Expired: "Hết hạn",
            Delete: "Xóa",
            // MessageNotify: (title: string, timer?: number)=>{
            //   return `Bạn có công việc ${title} ${timer ? `trong ${timer} phút` : "bây giờ"}`;
            // }

        }
    }
}
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    compatibilityJSON: 'v3',
    resources,
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;
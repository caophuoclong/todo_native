export const FormatDate = (
    date: string
)=>{
     const x = date.split('/');
      let swap = x[0];
      x[0] = x[2];
      x[2] = swap;
      swap = x[1];
      x[1] = x[2];
      x[2] = swap;
      return x.join("-");
}
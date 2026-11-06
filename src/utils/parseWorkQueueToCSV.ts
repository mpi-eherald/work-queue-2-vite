import { Parser } from '@json2csv/plainjs';

function parseWorkQueueToCSV(workQueue: Record<string, string>, selectedWC: string) {
  try {
    console.log(workQueue)
    const opts = {};
    const parser = new Parser(opts);
    const csv = parser.parse(workQueue);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const rawTime = now.toTimeString().split(' ')[0];
    const time = rawTime.split(':').join("");
    link.href = url;
    link.setAttribute('download', `${selectedWC}_${date}_${time}.csv`);
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error(err);
  }
}

export {
  parseWorkQueueToCSV
}
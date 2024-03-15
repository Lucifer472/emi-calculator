import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const ArticleView = ({
  blogData,
  faqData,
}: {
  blogData: string;
  faqData: string;
}) => {
  const blog = JSON.parse(blogData);
  const faq: {
    question: string;
    answer: string;
  }[] = JSON.parse(faqData);

  return (
    <article className="w-full max-w-xs xx:max-w-sm xs:max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto h-full flex flex-col items-start justify-start gap-y-1 px-2 sm:px-4 lg:px-0 prose blog-styles">
      {
        // @ts-ignore
        blog.blocks.map((b: any, index) => {
          switch (b.type) {
            case "paragraph":
              return (
                <p
                  key={index}
                  dangerouslySetInnerHTML={{ __html: b.data.text }}
                />
              );
            case "image":
              return (
                <Image
                  width={750}
                  height={750}
                  src={b.data.file.url}
                  alt={b.id}
                  key={index}
                  style={{ objectFit: "contain" }}
                />
              );
            case "header":
              switch (b.data.level) {
                case 1:
                  return (
                    <h1
                      key={index}
                      id={b.id}
                      dangerouslySetInnerHTML={{ __html: b.data.text }}
                    />
                  );
                case 2:
                  return (
                    <h2
                      key={index}
                      id={b.id}
                      dangerouslySetInnerHTML={{ __html: b.data.text }}
                    />
                  );
                case 3:
                  return (
                    <h3
                      key={index}
                      id={b.id}
                      dangerouslySetInnerHTML={{ __html: b.data.text }}
                    />
                  );
                case 4:
                  return (
                    <h4
                      key={index}
                      id={b.id}
                      dangerouslySetInnerHTML={{ __html: b.data.text }}
                    />
                  );
                case 5:
                  return (
                    <h6
                      key={index}
                      id={b.id}
                      dangerouslySetInnerHTML={{ __html: b.data.text }}
                    />
                  );
                default:
                  return (
                    <h6
                      key={index}
                      id={b.id}
                      dangerouslySetInnerHTML={{ __html: b.data.text }}
                    />
                  );
              }
            case "list":
              if (b.data.style === "unordered") {
                return (
                  <ul key={index}>
                    {b.data.items.map((list: any, listIndex: any) => (
                      <li
                        key={listIndex}
                        dangerouslySetInnerHTML={{ __html: list }}
                      />
                    ))}
                  </ul>
                );
              } else {
                return (
                  <ol key={index}>
                    {b.data.items.map((list: any, listIndex: any) => (
                      <li
                        key={listIndex}
                        dangerouslySetInnerHTML={{ __html: list }}
                      />
                    ))}
                  </ol>
                );
              }
            case "quote":
              return (
                <blockquote
                  key={index}
                  dangerouslySetInnerHTML={{ __html: b.data.text }}
                />
              );
            case "table":
              let l = true;
              return (
                <div
                  className="max-w-full sm:max-w-[750px] overflow-x-scroll sm:overflow-hidden mx-auto"
                  key={index}
                >
                  <table>
                    <tbody>
                      {b.data.content.map((table: any, tableIndex: any) => {
                        return (
                          <tr key={tableIndex}>
                            {l
                              ? table.map((t: any, colIndex: any) => {
                                  l = false;
                                  return (
                                    <th
                                      key={colIndex}
                                      dangerouslySetInnerHTML={{ __html: t }}
                                    />
                                  );
                                })
                              : table.map((t: any, colIndex: any) => (
                                  <td
                                    key={colIndex}
                                    dangerouslySetInnerHTML={{ __html: t }}
                                  />
                                ))}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              );
            default:
              return null;
          }
        })
      }
      {faq && faq[0].question !== "" && (
        <Accordion
          type="single"
          collapsible
          className=" w-full mt-4 border-t border-gray-300"
        >
          <h2
            style={{
              fontSize: "1.5rem",
              margin: ".6em 0",
            }}
          >
            FAQ:
          </h2>
          {faq.map((f, index) => (
            <AccordionItem value={`${index}`} key={index}>
              <AccordionTrigger className="text-sm">
                {f.question}
              </AccordionTrigger>
              <AccordionContent className="text-base">
                {f.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </article>
  );
};

export default ArticleView;

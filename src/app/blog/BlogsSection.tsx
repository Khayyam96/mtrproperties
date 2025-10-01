// "use client";

// import React from "react";
// import { Typography } from "antd";
// // import BlogCard, { BlogItem } from "../../components/Lib/BlogCard/BlogCard";
// // import CustomPagination from "../../components/Lib/ProPagination/CustomPagination";
// import styles from "./index.module.scss";
// import { Container } from "@/components/Lib/ProContainer/Container";
// // import { LastBlogResponse } from "@/models/LastBlog.model";
// import { Blog } from "@/models/Blog.model";

// const { Title, Paragraph } = Typography;



// type TProps = {
//   data: Blog;
//   className?: string;
// };

// export const BlogsSection: FC<TProps> = ({className }) => {



//   return (
//     <section className={`${styles.blogcards} ${className ?? ""}`}>
//       <Container>
//         <div className={styles.header}>
//           <Title level={2} className={styles.h1}>
//             Related blogs
//           </Title>
//           <Paragraph type="secondary" className={styles.subtitle}>
//             Lorem Ipsum is simply dummy text of the printing and typesetting industry.
//           </Paragraph>
//         </div>

//         {/* {data.data.map((item) => (
//           <Col key={item.id} xs={24} sm={12} md={12} lg={8} xl={6}>
//             <BlogCard item={item} />
//           </Col>
//         ))} */}
//       </Container>
//     </section>
//   );
// }

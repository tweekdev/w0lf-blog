import React from "react";

export const Details: React.FC<{
    title: string;
    coverImage: string;
    excerpt: string;
    author: { name: string; picture: string };
}> = ({ title, excerpt, author }) => {
    return (
        <>
            <div
                className="header-details"
                style={{
                    textAlign: "center",
                    width: "100%",
                    padding: "0 16px",
                }}
            >
                <p
                    style={{
                        margin: "0",
                        color: "white",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        width: "100%",
                        lineHeight: "1.5rem",
                        textTransform: "uppercase",
                        whiteSpace: "nowrap",
                    }}
                >
                    {title}
                </p>
            </div>

            <div
                className="header-details"
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <div>
                    <div
                        style={{
                            color: "#151535",
                            borderRadius: "4px",
                            margin: "1rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "1.25rem",
                            background: "#9fef00",
                        }}
                    >
                        <small>{author.name}</small>
                    </div>

                    <div className="details" style={{ margin: "0.25rem 1rem" }}>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <small
                                style={{
                                    color: "#a4b1cd",
                                }}
                            >
                                {excerpt}
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

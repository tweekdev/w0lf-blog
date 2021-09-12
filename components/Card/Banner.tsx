import React from "react";
export const Banner: React.FC<{
    difficulty: string;

    active: boolean;

    date: string;
}> = ({ active, difficulty, date }) => {
    return (
        <div
            className="banner"
            style={{
                color: "#fff",
                borderRadius: "16px 16px 0 0",
                height: "5.75rem",
                width: "100%",
                padding: "0",
                position: "relative",
                zIndex: 2,
                background: "#151d2b",
            }}
        >
            <div
                style={{
                    padding: "0.5rem 16px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                background: "#484e5a",
                                borderRadius: "50%",
                                height: "32px",
                                width: "32px",
                                marginRight: "8px",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    background: `${
                                        active ? "#00e5b5" : "#FFC700"
                                    }`,
                                    borderRadius: "50%",
                                    height: "16px",
                                    width: "16px",
                                }}
                            ></div>
                        </div>

                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                marginTop: "25px",
                                alignItems: "flex-start",
                            }}
                        >
                            <div>{active ? <p>Active</p> : <p>Retired</p>}</div>

                            <div>
                                <small>{date.slice(1, -1)}</small>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        marginTop: "8px",

                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            background: `${
                                difficulty === "easy"
                                    ? "#00e5b5"
                                    : difficulty === "medium"
                                    ? "#FFC700"
                                    : "#FF002E"
                            }`,
                            borderRadius: "50%",
                            height: "32px",
                            width: "32px",
                        }}
                    ></div>

                    <small>{difficulty}</small>
                </div>
            </div>
        </div>
    );
};
